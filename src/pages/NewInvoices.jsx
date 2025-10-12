





import { useState, useEffect } from 'react'
import '../styles/NewInvoice.css'
import jsPDF from "jspdf";
import 'jspdf-autotable';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../api';
import Logo from '../assets/iDealMartLogoNew.png'

const Invoice = () => {
    const [state, setState] = useState({
        taxPer: 13,
        iDealMarCom: 10,
    })
    const navigate = useNavigate();
    
    const location = useLocation();
    const [invoice, setInvoice] = useState([])
    const [itemCommissions, setItemCommissions] = useState({})
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
    let totalCommission = parseFloat(totalItemCommission)
    let payAmountWithCom = parseFloat(subTotal) + parseFloat(taxAmountFixed) - totalCommission
    let fixedPayAmount = payAmountWithCom.toFixed(2);

    const handleDownloadPDF = async () => {
        const pdf = new jsPDF("p", "mm", "a4");
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        let yPos = 20;

        // Add logo
        try {
            pdf.addImage(Logo, "PNG", 15, yPos, 40, 15);
        } catch (e) {
            console.log("Logo not added:", e);
        }

        // Header
        pdf.setFontSize(24);
        pdf.setTextColor(64, 64, 149);
        pdf.text("INVOICE", pageWidth - 15, yPos + 10, { align: "right" });
        
        yPos += 20;
        
        // Company details
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        pdf.text("88 Colgate Ave", 15, yPos);
        yPos += 5;
        pdf.text("Toronto, ON M4M 3L1", 15, yPos);
        yPos += 10;
        
        // Submitted date
        pdf.setFontSize(10);
        pdf.setTextColor(210, 90, 110);
        pdf.text(`Submitted On ${formatDateDDMMYYYY(invoice.created_at)}`, 15, yPos);
        yPos += 10;

        // Invoice details table - CORRECTED
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
                fillColor: [64, 64, 149],
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

        // Items table data
        const tableData = updatedData.map((item, id) => {
            const orderDate = new Date(item.order_date).toLocaleString('en-CA', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(',', '');

            return [
                orderDate,
                item.orderID,
                item.product,
                item.quantity,
                `$${parseFloat(item.unit_price).toFixed(2)}`,
                `$${parseFloat(item.discount_price).toFixed(2)}`,
                `$${parseFloat(item.itemTotal).toFixed(2)}`,
                `$${parseFloat(itemCommissions[id] || 0).toFixed(2)}`
            ];
        });

        // Items table - CORRECTED
        pdf.autoTable({
            startY: yPos,
            head: [['Date', 'Order #', 'Name', 'Qty', 'Unit Price', 'Disc. Price', 'Total', 'Comm Amount']],
            body: tableData,
            theme: 'striped',
            headStyles: {
                fillColor: [64, 64, 149],
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
                0: { cellWidth: 30 },
                1: { cellWidth: 20 },
                2: { cellWidth: 'auto' },
                3: { cellWidth: 15 },
                4: { cellWidth: 20 },
                5: { cellWidth: 20 },
                6: { cellWidth: 20 },
                7: { cellWidth: 22 }
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

        // Summary section
        yPos = pdf.lastAutoTable.finalY + 10;

        if (yPos > pageHeight - 60) {
            pdf.addPage();
            yPos = 20;
        }

        const summaryX = pageWidth - 70;
        pdf.setFontSize(10);
        pdf.setTextColor(0, 0, 0);
        
        pdf.text(`Subtotal:`, summaryX, yPos);
        pdf.text(`$${subTotal.toFixed(2)}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 7;
        
        pdf.text(`Tax (${taxPer}%):`, summaryX, yPos);
        pdf.text(`$${taxAmountFixed}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 7;
        
        pdf.text(`Total Item Commission (${iDealMarCom}% on discounts):`, summaryX - 25, yPos);
        pdf.text(`$${totalItemCommission.toFixed(2)}`, pageWidth - 15, yPos, { align: 'right' });
        yPos += 7;
        
        pdf.text(`Total Commission:`, summaryX, yPos);
        pdf.text(`$${totalCommission.toFixed(2)}`, pageWidth - 15, yPos, { align: 'right' });
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