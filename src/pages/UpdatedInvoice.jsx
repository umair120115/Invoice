import { useState, useEffect } from 'react'
import '../styles/NewInvoice.css'
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import Logo from '../assets/iDealMartLogoNew.png'

const Invoice = () => {
    const [state, setState] = useState({
        taxPer: 13, // Default tax rate as requested
    })
    const navigate = useNavigate();
    
    const location = useLocation();
    const [invoice, setInvoice] = useState([])
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
    // console.log("Updated Data:", productDetails);

    useEffect(() => {
        getInvoice();
    }, []);

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

    const { taxPer } = state;

    // --- NEW CALCULATION LOGIC ---
    let subTotal = 0
    for (let i = 0; i < updatedData.length; i++) {
        const item = updatedData[i]
        // Subtotal is based on the discounted price (what the customer paid)
        subTotal += parseFloat(item.discount_price) * parseInt(item.quantity)
    }

    const commissionPercentage = 10; // As requested: "10% of the Subtotal"
    
    let taxAmount = (subTotal * taxPer) / 100
    let totalCommission = (subTotal * commissionPercentage) / 100 // New commission logic
    let payoutAmount = subTotal + taxAmount - totalCommission

    // For display
    let subTotalFixed = subTotal.toFixed(2)
    let taxAmountFixed = taxAmount.toFixed(2)
    let totalCommissionFixed = totalCommission.toFixed(2)
    let fixedPayAmount = payoutAmount.toFixed(2);
    // --- END NEW CALCULATION LOGIC ---


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

    const handleDownloadPDF = async () => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yPos = 20;

        // Add logo
        try {
            pdf.addImage(Logo, "PNG", 15, yPos, 40, 12);
        } catch (e) {
            console.log("Logo not added:", e);
        }

        // Header - Matched to PDF 
        pdf.setFontSize(24);
        pdf.setTextColor(64, 64, 149);
        pdf.text("Invoice", pageWidth - 15, yPos + 10, { align: "right" });
        
        yPos += 20;
        
        // Company details - Matched to PDF 
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text("88 Colgate Ave", 15, yPos);
        yPos += 5;
        pdf.text("Toronto, ON M4M 3L1", 15, yPos);
        yPos += 10;
        
        // Submitted date - Matched to PDF 
        pdf.setFontSize(10);
        pdf.setTextColor(210, 90, 110);
        pdf.text(`Submitted On ${formatDateDDMMYYYY(invoice.created_at)}`, 15, yPos);
        yPos += 10;

        // Invoice details table - Matched to PDF 
        pdf.autoTable({
            startY: yPos,
            head: [['Invoice For', 'Payable to', 'Invoice #', 'Due Date']],
            body: [[
                store_name,
                store_email,
                invoice.invoice_no || 'N/A',
                invoice.end_date || 'N/A'
            ]],
            theme: 'grid',
            headStyles: {
                fillColor: [1, 99, 29],
                textColor: [255, 255, 255],
                fontSize: 10,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 9
            },
            margin: { left: 15, right: 15 }
        });

        yPos = pdf.lastAutoTable.finalY + 10;

        // --- NEW Items table data ---
        const tableData = updatedData.map(item => {
            const orderDate = new Date(item.order_date);
            
            // New "Actual Unit Price" calculation
            const actualUnitPrice = (10 * parseFloat(item.discount_price) - parseFloat(item.unit_price)) / 9;
            const totalItemPrice = actualUnitPrice * parseInt(item.quantity);

            return [
                orderDate.toLocaleDateString('en-CA'), // Date (e.g., 2025-10-18)
                orderDate.toLocaleTimeString('en-CA', { hour12: false }), // Time (e.g., 11:01:03)
                `${item.orderID}\n${item.product}`, // Order# \n Name
                item.quantity,
                `$${actualUnitPrice.toFixed(2)}`,
                `$${totalItemPrice.toFixed(2)}`
            ];
        });

        // Items table - Matched to PDF 
        pdf.autoTable({
            startY: yPos,
            head: [['Date', 'Time', 'Order Item', 'Qty', 'Unit price', 'Total price']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor:[1, 99, 29],
                textColor: [255, 255, 255],
                fontSize: 9,
                fontStyle: 'bold'
            },
            bodyStyles: {
                fontSize: 8
            },
            alternateRowStyles: {
                fillColor: [245, 245, 245]
            },
            margin: { left: 15, right: 15 },
            columnStyles: {
                0: { cellWidth: 25 }, // Date
                1: { cellWidth: 20 }, // Time
                2: { cellWidth: 'auto' }, // Order/Name
                3: { cellWidth: 15 }, // Qty
                4: { cellWidth: 25 }, // Unit Price
                5: { cellWidth: 25 }  // Total Price
            },
            didDrawPage: (data) => {
                const pageCount = pdf.internal.getNumberOfPages();
                pdf.setFontSize(8);
                pdf.setTextColor(128, 128, 128);
                pdf.text(
                    `Page ${pdf.internal.getCurrentPageInfo().pageNumber} of ${pageCount}`,
                    pageWidth / 2,
                    pageHeight - 10,
                    { align: 'center' }
                );
            }
        });

        // Summary section - Matched to PDF 
        yPos = pdf.lastAutoTable.finalY + 10;

        if (yPos > pageHeight - 60) {
            pdf.addPage();
            yPos = 20;
        }

        const summaryX = pageWidth - 70;
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        pdf.text(`Subtotal:`, summaryX, yPos);
        pdf.text(`$${subTotalFixed}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 7;
        
        pdf.text(`Tax :`, summaryX, yPos);
        pdf.text(`$${taxAmountFixed}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 7;
        
        // Updated to match new logic and PDF format
        pdf.text(`!DealMart Commission :`, summaryX - 10, yPos);
        pdf.text(`$${totalCommissionFixed}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 10;
        
        // Payout amount
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'bold');
        pdf.setTextColor(219, 137, 150);
        pdf.text(`Payout Amount:`, summaryX, yPos);
        pdf.text(`$${fixedPayAmount}`, pageWidth - 15, yPos, { align: 'right' });

        // Save PDF
        const now = new Date();
        const dateStamp = now.toISOString().slice(0, 10).replace(/-/g, '');
        pdf.save(`${store_name}_${dateStamp}_Invoice.pdf`);

        navigate('/home');
    };

    const taxPerChange = (event) => {
        setState((prev) => ({ ...prev, taxPer: event.target.value }))
    }

    return (
        <div>
            <div className="input-fields">
                <label className="label-el" htmlFor='taxPer'><b>Tax Percentage : </b></label>
                <input type="number" id="taxPer" placeholder='Only Numbers Allowed' value={taxPer} onChange={taxPerChange} />
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
                                    <th className="table-header">Time</th>
                                    <th className="table-header">Order #</th>
                                    <th className="table-header">Name</th>
                                    <th className="table-header">Qty</th>
                                    <th className="table-header">Unit price</th>
                                    <th className="table-header">Total price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {updatedData.map((item, id) => {
                                    const orderDate = new Date(item.order_date);
                                    const actualUnitPrice = (10 * parseFloat(item.discount_price) - parseFloat(item.unit_price)) / 9;
                                    const totalItemPrice = actualUnitPrice * parseInt(item.quantity);

                                    return (
                                        <tr className='table-bg' key={id}>
                                            <td>{orderDate.toLocaleDateString('en-CA')}</td>
                                            <td>{orderDate.toLocaleTimeString('en-CA', { hour12: false })}</td>
                                            <td>{item.orderID}</td>
                                            <td>{item.product}</td>
                                            <td>{item.quantity}</td>
                                            <td>${actualUnitPrice.toFixed(2)}</td>
                                            <td>${totalItemPrice.toFixed(2)}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="footer-cont">
                        {/* Updated to use new calculation variables */}
                        <h5>Subtotal : ${subTotalFixed}</h5>
                        <h5>Tax  : ${taxAmountFixed}</h5>
                        <h5>!DealMart Commission  : ${totalCommissionFixed}</h5>
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