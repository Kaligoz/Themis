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

  const canvas = await html2canvas(element, { scale: 2, useCORS: true, windowHeight: element.scrollHeight, logging: true,
    onclone: (clonedDoc) => {
      const elements = clonedDoc.getElementsByTagName("*");
      for (let i = 0; i < elements.length; i++) {
        const style = window.getComputedStyle(elements[i]);
        if (style.color.includes("lab") || style.backgroundColor.includes("lab") || style.borderColor.includes("lab")) {
          (elements[i] as HTMLElement).style.color = "inherit";
          (elements[i] as HTMLElement).style.backgroundColor = "transparent";
          (elements[i] as HTMLElement).style.borderColor = "inherit";
        }
      }
    },
  })
  
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF("p", "mm", "a4")

  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
  pdf.save("themis-report.pdf")
}