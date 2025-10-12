




import { useState, useEffect } from 'react'
import '../styles/NewInvoice.css'
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import Logo from '../assets/iDealMartLogoNew.png'

const Invoice = () => {
    const [state, setState] = useState({
        taxPer: 13,
        iDealMarCom: 10, // Changed default to 10
    })
    const navigate = useNavigate();
    
    const location = useLocation();
    const [invoice, setInvoice] = useState([])
    const [itemCommissions, setItemCommissions] = useState({}) // Store individual item commission amounts (editable)
    const productDetails = location.state
  
    const store_email = productDetails[0].store_email
    const owner = productDetails[0].store_owner
    const store_name = productDetails[0].store

    const updatedData = productDetails.map((item) => ({
        discountPrice: item.discount_price,
        itemTotal: item.item_total,
        orderID: item.orderID,
        orderDate: item.order_date,
        unit_price: item.unit_price,
        discount_price: item.discount_price,
        product: item.product,
        quantity: item.quantity,
        store: item.store,
        tax: item.tax,
        order_date: item.orderDate
    }))

    useEffect(() => {
        getInvoice();
    }, []);

    // Recalculate item commissions when iDealMarCom changes
    useEffect(() => {
        if (updatedData.length > 0) {
            const recalculatedCommissions = {}
            updatedData.forEach((item, index) => {
                const priceDifference = parseFloat(item.unit_price) - parseFloat(item.discount_price)
                const calculatedAmount = (priceDifference * state.iDealMarCom / 100) * parseInt(item.quantity)
                recalculatedCommissions[index] = calculatedAmount.toFixed(2)
            })
            setItemCommissions(recalculatedCommissions)
        }
    }, [state.iDealMarCom, updatedData.length]);

    const getInvoice = async () => {
        const invoicedata = new FormData();
        invoicedata.append("storeid", productDetails[0].storeid)
        invoicedata.append("start_date", productDetails[0].start_date)
        invoicedata.append("end_date", productDetails[0].end_date)
        const res = await api.post('/api/stores/invoice/', invoicedata, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        setInvoice(res.data.invoice_details)
    }

    updatedData.sort((a, b) => new Date(a.order_date) - new Date(b.order_date))

    const { taxPer, iDealMarCom } = state;

    // Calculate the suggested commission amount using current iDealMarCom percentage
    const calculateSuggestedCommission = (item) => {
        const priceDifference = parseFloat(item.unit_price) - parseFloat(item.discount_price)
        const commissionAmount = (priceDifference * iDealMarCom / 100) * parseInt(item.quantity)
        return commissionAmount.toFixed(2)
    }

    // Calculate totals
    let subTotal = 0
    let totalItemCommission = 0
    
    for (let i = 0; i < updatedData.length; i++) {
        const item = updatedData[i]
        subTotal += parseFloat(item.discount_price) * parseInt(item.quantity)
        totalItemCommission += parseFloat(itemCommissions[i] || 0)
    }

    function formatDateDDMMYYYY(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return "Invalid Date";
        }
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDay = String(day).padStart(2, '0');
        const formattedMonth = String(month).padStart(2, '0');
        return `${formattedDay}/${formattedMonth}/${year}`;
    }
    
    let taxAmount = ((parseFloat(subTotal) * taxPer) / 100)
    let taxAmountFixed = taxAmount.toFixed(2)
    let iDealMartCommAmount = (parseFloat(subTotal) + parseFloat(taxAmountFixed)) * (iDealMarCom / 100)
    let fixedIdealMartComAmt = iDealMartCommAmount.toFixed(2)
    let totalCommission = parseFloat(totalItemCommission)
    let payAmountWithCom = parseFloat(subTotal) + parseFloat(taxAmountFixed) - totalCommission
    let fixedPayAmount = payAmountWithCom.toFixed(2);

    const handleDownloadPDF = async () => {
        const element = document.getElementById("pdf-content");
        
        // Hide all input fields before capturing
        const inputs = element.querySelectorAll('input');
        const inputValues = [];
        inputs.forEach((input, index) => {
            inputValues.push(input.value);
            const span = document.createElement('span');
            span.textContent = '$' + input.value;
            span.style.fontWeight = 'normal';
            input.parentNode.replaceChild(span, input);
        });

        const canvas = await html2canvas(element, { 
            scale: 2,
            useCORS: true,
            logging: false,
            windowHeight: element.scrollHeight,
            windowWidth: element.scrollWidth
        });

        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgWidth = pdfWidth;
        const imgHeight = (canvas.height * pdfWidth) / canvas.width;

        let heightLeft = imgHeight;
        let position = 0;

        // Add first page
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;

        // Add additional pages if content exceeds one page
        while (heightLeft > 0) {
            position -= pdfHeight;
            pdf.addPage();
            pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
            heightLeft -= pdfHeight;
        }
        const now = new Date();
        const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD


        pdf.save(`${store_name}_${dateStamp}__Invoice.pdf`);

        // Restore input fields after PDF generation
        const spans = element.querySelectorAll('td > span');
        spans.forEach((span, index) => {
            if (inputValues[index] !== undefined) {
                const input = document.createElement('input');
                input.type = 'number';
                input.value = inputValues[index];
                input.step = '0.01';
                input.min = '0';
                input.className = 'commission-input';
                input.onchange = (e) => handleItemCommissionChange(index, e.target.value);
                span.parentNode.replaceChild(input, span);
            }
        });

        navigate('/home');
    };

    const handleItemCommissionChange = (index, value) => {
        setItemCommissions(prev => ({
            ...prev,
            [index]: parseFloat(value) || 0
        }))
    }

    const iDealMarComChange = (event) => {
        const newValue = parseFloat(event.target.value) || 0;
        setState((prev) => ({ ...prev, iDealMarCom: newValue }));
    }

    const taxPerChange = (event) => {
        setState((prev) => ({ ...prev, taxPer: event.target.value }))
    }

    return (
        <div>
            <div className="input-fields">
                <label className="label-el" htmlFor='taxPer'><b>Tax Percentage : </b></label>
                <input type="number" id="taxPer" placeholder='Only Numbers Allowed' value={taxPer} onChange={taxPerChange} />
                <label className="label-el" htmlFor='comPer'><b>iDealMart Base Commission % : </b></label>
                <input type="number" id="comPer" placeholder='Only Numbers Allowed' value={iDealMarCom} onChange={iDealMarComChange} />
            </div>
            <div id="pdf-content">
                <div>
                    <div className='hr-line'>
                        <img src={Logo} alt="logo" />
                        <p>88 Colgate Ave</p>
                        <p>Toronto, ON M4M 3L1</p>
                        <h1 className="invoice-header">Invoice</h1>
                        <h4 className="semi-header">Submitted On {formatDateDDMMYYYY(invoice.created_at)}</h4>
                    </div>
                    <div className='width-table'>
                        <div className='table-margin'>
                            <table className='table small-table'>
                                <thead>
                                    <tr>
                                        <th>Invoice For</th>
                                        <th>Payable to</th>
                                        <th>Invoice #</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{store_name}</td>
                                        <td>{store_email}</td>
                                        <td>{invoice.invoice_no}</td>
                                        <td>{invoice.end_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr />
                        <table className="table-margin">
                            <thead>
                                <tr>
                                    <th className="table-header">Date</th>
                                    <th className="table-header">Order #</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Qty</th>
                                    <th className="table-header">Unit Price</th>
                                    <th className="table-header">Disc. Price</th>
                                    <th className="table-header">Total</th>
                                    <th className="table-header">Comm Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedData.map((item, id) => {
                                    return (
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
                                            <td>{item.orderID}</td>
                                            <td>{item.product}</td>
                                            <td>{item.quantity}</td>
                                            <td>${item.unit_price}</td>
                                            <td>${item.discount_price}</td>
                                            <td>${item.itemTotal}</td>
                                            <td>
                                                <input 
                                                    type="number" 
                                                    value={itemCommissions[id] || 0}
                                                    onChange={(e) => handleItemCommissionChange(id, e.target.value)}
                                                    className="commission-input"
                                                    step="0.01"
                                                    min="0"
                                                />
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="footer-cont">
                        <h5>Subtotal : ${subTotal.toFixed(2)}</h5>
                        <h5>Tax ({taxPer}%) : ${taxAmountFixed}</h5>
                        <h5>Total Item Commission ({iDealMarCom}% on discounts) : ${totalItemCommission.toFixed(2)}</h5>
                        <h5>Total Commission : ${totalCommission.toFixed(2)}</h5>
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

export default Invoice