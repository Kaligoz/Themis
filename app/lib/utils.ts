import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
};

export const formatCurrency = (value: number, currency: string) => {

  const safeCurrency = (currency && currency.length === 3) ? currency : 'USD'

  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: safeCurrency,
    }).format(value);
  } catch (e) {
    return `${safeCurrency} ${value.toLocaleString()}`;
  }
};

export const handleExport = async (elementId: string) => {
  const element = document.getElementById(elementId) 

  if(!element) {
    console.error("Element not found")
    return 
  }

  const canvas = await html2canvas(element, { 
    scale: 2, 
    useCORS: true, 
    windowHeight: element.scrollHeight, 
    logging: true,
    backgroundColor: "#ffffff",
    onclone: (clonedDoc) => {
      const clonedElement = clonedDoc.getElementById(elementId)
      if (clonedElement) {
        clonedElement.style.height = `${element.scrollHeight}px`
        clonedElement.style.transform = "none"
        const allText = clonedElement.querySelectorAll("*")
        allText.forEach((el) => {
          const htmlEl = el as HTMLElement
          htmlEl.style.lineHeight = "1.2"
          const style = window.getComputedStyle(el)
          if (style.color.includes("lab") || style.backgroundColor.includes("lab")) {
            htmlEl.style.color = "black"
            htmlEl.style.backgroundColor = "transparent"
          }
        });
      }
    },
  })
  
  const imgData = canvas.toDataURL('image/png')

  const pdf = new jsPDF("landscape", "mm", [720, 1320])
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  const imgProps = pdf.getImageProperties(imgData)
  const ratio = imgProps.width / imgProps.height

  let finalWidth = pdfWidth
  let finalHeight = pdfWidth / ratio

  if (finalHeight > pdfHeight) {
    const scaleFactor = pdfHeight / finalHeight
    finalHeight = pdfHeight
    finalWidth = finalWidth * scaleFactor
  }

  pdf.addImage(imgData, "PNG", (pdfWidth - finalWidth) / 2, 0, finalWidth, finalHeight)
  pdf.save("themis-report.pdf")
}