import { useState,useEffect } from 'react'
import '../styles/Invoice.css'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation,useNavigate } from 'react-router-dom';
import api from '../api';
import Logo from '../assets/iDealMartLogoNew.png'

const Home = () => {
    const [state, setState] = useState({
        taxPer: 13,
        iDealMarCom: 5,
    })
    const navigate= useNavigate();
    
    
    const location=useLocation();
    const [invoice,setInvoice]= useState([])
    const productDetails = location.state //All products having status confirmed or commpleted!
  
    
    const store_email =productDetails[0].store_email
    const owner =productDetails[0].store_owner
    const store_name=productDetails[0].store

    const updatedData = productDetails.map((item) => ({
        // commission: item.commission,
        discountPrice: item.discount_price,
        itemTotal: item.item_total,
        orderID: item.orderID,
        orderDate:(item.order_date),//new Date(item.order_date),
        unit_price: item.unit_price,
        discount_price: item.discount_price,
        product: item.product,
        quantity: item.quantity,
        store: item.store,
        tax: item.tax,
        order_date:item.orderDate

    }))
    console.log(updatedData);
    useEffect(
        ()=>{
            getInvoice();
        },[]
    );
    const getInvoice=async()=>{
        const invoicedata=new FormData();
        invoicedata.append("storeid",productDetails[0].storeid)
        invoicedata.append("start_date",productDetails[0].start_date)
        invoicedata.append("end_date",productDetails[0].end_date)
        const res = await api.post('/api/stores/invoice/',invoicedata,{
            headers:{"Content-Type":"multipart/form-data",}
        })
        setInvoice(res.data.invoice_details)
        
    }
    updatedData.sort((a, b) => new Date(a.order_date) - new Date(b.order_date))  //sorting order's as per orderDate
    const { taxPer, iDealMarCom } = state;
    let subTotal = 0
    for (let i of updatedData) {
        subTotal += parseFloat(i.discount_price) * parseInt(i.quantity)
    }
    // console.log(`Subtotal =${subTotal}\n`);



    function formatDateDDMMYYYY(dateString) {
        // Create a Date object from the ISO string
        const date = new Date(dateString);
      
        // Check if the date is valid
        if (isNaN(date.getTime())) {
          return "Invalid Date";
        }
      
        // Get day, month, and year
        // getMonth() is 0-indexed, so add 1
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
      
        // Pad day and month with a leading zero if needed
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
      
        // Return in DD/MM/YYYY format
        return `${formattedDay}/${formattedMonth}/${year}`;
      }
    
    let taxAmount = ((parseFloat(subTotal) * taxPer) / 100)
    // console.log(`${taxAmount}\n`)
    let taxAmountFixed = taxAmount.toFixed(2)
    // console.log(`${taxAmountFixed}\n`)
    // let iDealMartCommAmount = (parseFloat(subTotal)+parseFloat(taxAmountFixed)) * (iDealMarCom/ 100)
    let iDealMartCommAmount= (parseFloat(subTotal)+parseFloat(taxAmountFixed))* (iDealMarCom/100)
    let fixedIdealMartComAmt = iDealMartCommAmount.toFixed(2)
    // let payAmountWithCom = parseFloat(subTotal) + parseFloat(taxAmountFixed) + parseFloat(fixedIdealMartComAmt)
    let payAmountWithCom=parseFloat(subTotal)+parseFloat(taxAmountFixed) - parseFloat(fixedIdealMartComAmt)
    let fixedPayAmount = payAmountWithCom.toFixed(2);

    // const handleDownloadPDF = () => {
    //     const element = document.getElementById("pdf-content");
    //     html2canvas(element).then((canvas) => {
    //         const imgData = canvas.toDataURL("image/png");
    //         const pdf = new jsPDF("p", "mm", "a4");
    //         pdf.addImage(imgData, "PNG", 16, 16, 190, 0);
    //         pdf.setFontSize(20);
    //         pdf.setFontSize(24);
    //         // pdf.text("Hello, PDF!", 10, 20);
    //         pdf.setFontSize(16);
    //         pdf.save("Invoice.pdf");
    //         navigate("/home");
    //     });
    // };
    

const handleDownloadPDF = async () => {
    const element = document.getElementById("pdf-content");
    const canvas = await html2canvas(element, { scale: 2 });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();

    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // First page
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;

    // Add more pages if necessary
    while (heightLeft > 0) {
        position -= pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
    }

    pdf.save(`${store_name}Invoice.pdf`);
    navigate('/home');
};

  
    
    const iDealMarComChange = (event) => {
        setState((prev) => ({ ...prev, iDealMarCom: event.target.value }))
    }
    const taxPerChange = (event) => {
        setState((prev) => ({ ...prev, taxPer: event.target.value }))
    }
    return (
        <div>
            <div className="input-fields">
                <label className="label-el" htmlFor='taxPer'><b>Tax Percentage : </b> </label>
                <input type="number" id="taxPer" placeholder='Only Numbers Allowed' value={taxPer} onChange={taxPerChange} />
                <label className="label-el" htmlFor='comPer'><b>iDealMart Commission Percentage : </b></label>
                <input type="number" id="comPer" placeholder='Only Numbers Allowed' value={iDealMarCom} onChange={iDealMarComChange} />
            </div>
            <div id="pdf-content" >
                <div>
                    <div className='hr-line'>
                        <img src={Logo} alt="logo" />
                        <p>88 Colgate Ave</p>
                        <p>Toronto, ON M4M 3L1</p>
                        <h1 className="invoice-header">Invoice</h1>
                        <h4 className="semi-header">Submitted On {formatDateDDMMYYYY(invoice.created_at)} </h4>
                    </div>
                    <div className='width-table'>
                        <div className='table-margin'>
                            <table className='table  small-table'>
                                <thead>
                                    <tr>
                                        <th>
                                            Invoice For
                                        </th>
                                        <th>
                                            Payable to
                                        </th>
                                        <th>
                                            Invoice #
                                        </th>
                                        <th>
                                            Due Date
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{store_name}</td>
                                        <td >{store_email}</td>
                                        <td>{invoice.invoice_no}</td>
                                        <td>{invoice.end_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <table className="table-margin" >
                            <thead>
                                <tr>
                                    <th className="table-header">Date</th>
                                    <th className="table-header">Order #</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Qty</th>
                                    <th className="table-header">Unit price</th>
                                    <th className="table-header">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedData.map((item, id) =>
                                    <tr className='table-bg' key={id}>
                                        <td>{new Date(item.order_date).toLocaleString('en-CA', {
                                            year: 'numeric',
                                            month: '2-digit',
                                            day: '2-digit',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            hour12: false
                                        }).replace(',', '')}</td>
                                        {/* <td>{item.orderDate}</td> */}
                                        <td>{item.orderID}</td>
                                        <td>{item.product}</td>
                                        <td>{item.quantity}</td>
                                        <td>{item.discount_price}</td>
                                        {/* <td>{item.discount_price * item.quantity}</td> */}
                                        <td>{item.itemTotal}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    <div className="footer-cont">
                        <h5>Subtotal : ${subTotal.toFixed(2)}</h5>
                        <h5>Tax : ${taxAmountFixed}</h5>
                        <h5>iDealMart Commission : ${fixedIdealMartComAmt}</h5>
                        <h4 className="payout-header">Payout Amount : ${fixedPayAmount}</h4>
                    </div>
                </div>
            </div>
            <div className="download-btn-div">
                <button onClick={handleDownloadPDF} type="button" className="download-btn">Download PDF</button>
            </div>
        </div>
    )
}

export default Home