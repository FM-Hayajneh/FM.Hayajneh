// PDF Generator for Comprehensive Diagnosis Reports
class PDFGenerator {
    constructor() {
        this.isGenerating = false;
    }

    async generateReport(analysisResults, language = 'ar') {
        if (this.isGenerating) {
            throw new Error('PDF generation already in progress');
        }

        this.isGenerating = true;

        try {
            // In a real implementation, this would use a library like jsPDF
            // For now, we'll simulate PDF generation and provide a download link
            return await this.simulatePDFGeneration(analysisResults, language);
        } finally {
            this.isGenerating = false;
        }
    }

    async simulatePDFGeneration(analysisResults, language) {
        // Simulate PDF generation delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Create a blob that simulates a PDF file
        const pdfContent = this.generatePDFContent(analysisResults, language);
        const blob = new Blob([pdfContent], { type: 'application/pdf' });
        
        return {
            blob: blob,
            url: URL.createObjectURL(blob),
            filename: this.generateFilename(analysisResults, language)
        };
    }

    generatePDFContent(analysisResults, language) {
        // This is a simplified simulation
        // In real implementation, use jsPDF to generate actual PDF content
        const content = `
            %PDF-1.4
            1 0 obj
            << /Type /Catalog /Pages 2 0 R >>
            endobj
            2 0 obj
            << /Type /Pages /Kids [3 0 R] /Count 1 >>
            endobj
            3 0 obj
            << /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
            endobj
            4 0 obj
            << /Length 100 >>
            stream
            BT
            /F1 12 Tf
            50 750 Td
            (${language === 'ar' ? 'تقرير التشخيص الشامل' : 'Comprehensive Diagnosis Report'}) Tj
            ET
            endstream
            endobj
            xref
            0 5
            0000000000 65535 f 
            0000000009 00000 n 
            0000000058 00000 n 
            0000000115 00000 n 
            0000000234 00000 n 
            trailer
            << /Size 5 /Root 1 0 R >>
            startxref
            295
            %%EOF
        `;

        return content;
    }

    generateFilename(analysisResults, language) {
        const timestamp = new Date().toISOString().split('T')[0];
        const diseaseName = analysisResults.disease.name[language] || 'unknown';
        
        if (language === 'ar') {
            return `تقرير-التشخيص-${diseaseName}-${timestamp}.pdf`;
        } else {
            return `diagnosis-report-${diseaseName}-${timestamp}.pdf`;
        }
    }

    downloadPDF(pdfData) {
        const link = document.createElement('a');
        link.href = pdfData.url;
        link.download = pdfData.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        setTimeout(() => URL.revokeObjectURL(pdfData.url), 100);
    }

    // Method to generate printable HTML content (fallback)
    generatePrintableHTML(analysisResults, language) {
        const direction = language === 'ar' ? 'rtl' : 'ltr';
        const textAlign = language === 'ar' ? 'right' : 'left';

        return `
            <!DOCTYPE html>
            <html dir="${direction}" lang="${language}">
            <head>
                <meta charset="UTF-8">
                <title>${language === 'ar' ? 'تقرير التشخيص الشامل' : 'Comprehensive Diagnosis Report'}</title>
                <style>
                    body {
                        font-family: 'Tajawal', Arial, sans-serif;
                        direction: ${direction};
                        text-align: ${textAlign};
                        margin: 20px;
                        line-height: 1.6;
                    }
                    .header {
                        text-align: center;
                        border-bottom: 2px solid #333;
                        padding-bottom: 20px;
                        margin-bottom: 30px;
                    }
                    .section {
                        margin-bottom: 25px;
                        padding: 15px;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                    }
                    .section-title {
                        font-weight: bold;
                        color: #4361ee;
                        margin-bottom: 10px;
                        font-size: 1.2em;
                    }
                    .confidence {
                        text-align: center;
                        background: #f8f9fa;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    .warning {
                        background: #fff3cd;
                        border: 1px solid #ffeaa7;
                        padding: 15px;
                        border-radius: 8px;
                        margin: 20px 0;
                    }
                    @media print {
                        body { margin: 0; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="header">
                    <h1>${language === 'ar' ? 'تقرير التشخيص الشامل' : 'Comprehensive Diagnosis Report'}</h1>
                    <p>${language === 'ar' ? 'نظام تشخيص صحة الدجاج بالذكاء الاصطناعي' : 'AI-Powered Chicken Health Diagnosis System'}</p>
                    <p>${new Date().toLocaleDateString(language === 'ar' ? 'ar-SA' : 'en-US')}</p>
                </div>

                <div class="confidence">
                    <h3>${language === 'ar' ? 'مؤشر الثقة العام' : 'Overall Confidence Indicator'}</h3>
                    <h2>${analysisResults.overallConfidence}%</h2>
                </div>

                <div class="warning">
                    <strong>${language === 'ar' ? 'ملاحظة هامة:' : 'Important Note:'}</strong>
                    ${language === 'ar' 
                        ? 'هذه النتائج استرشادية وتحتاج لتأكيد من طبيب بيطري متخصص. لا تستبدل التشخيص الطبي المهني.'
                        : 'These results are indicative and require confirmation from a specialized veterinarian. They do not replace professional medical diagnosis.'
                    }
                </div>

                ${this.generateHTMLSections(analysisResults, language)}
            </body>
            </html>
        `;
    }

    generateHTMLSections(analysisResults, language) {
        const sections = [
            {
                title: language === 'ar' ? 'نوع الدجاجة' : 'Chicken Breed',
                content: `
                    <p><strong>${analysisResults.breed.name[language]}</strong></p>
                    <p>${language === 'ar' ? 'نسبة الثقة:' : 'Confidence:'} ${analysisResults.breed.confidence}%</p>
                `
            },
            {
                title: language === 'ar' ? 'الوزن التقديري' : 'Estimated Weight',
                content: `
                    <p><strong>${analysisResults.weight.estimated}</strong></p>
                    <p>${analysisResults.weight.method[language]}</p>
                    <p>${language === 'ar' ? 'هامش الخطأ:' : 'Error Margin:'} ${analysisResults.weight.errorMargin}</p>
                `
            },
            {
                title: language === 'ar' ? 'المرض المشتبه به' : 'Suspected Disease',
                content: `
                    <p><strong>${analysisResults.disease.name[language]}</strong></p>
                    <p>${language === 'ar' ? 'نسبة الاحتمال:' : 'Probability:'} ${analysisResults.disease.probability}%</p>
                `
            },
            {
                title: language === 'ar' ? 'طريقة العلاج' : 'Treatment',
                content: `
                    <p><strong>${language === 'ar' ? 'الدواء:' : 'Medication:'}</strong> ${analysisResults.treatment.medication[language]}</p>
                    <p><strong>${language === 'ar' ? 'الجرعة:' : 'Dosage:'}</strong> ${analysisResults.treatment.dosage[language]}</p>
                    <p><strong>${language === 'ar' ? 'المدة:' : 'Duration:'}</strong> ${analysisResults.treatment.duration[language]}</p>
                    <p><strong>${language === 'ar' ? 'تحذيرات:' : 'Warnings:'}</strong> ${analysisResults.treatment.warnings[language]}</p>
                `
            }
        ];

        return sections.map(section => `
            <div class="section">
                <div class="section-title">${section.title}</div>
                ${section.content}
            </div>
        `).join('');
    }

    printHTMLReport(analysisResults, language) {
        const printableWindow = window.open('', '_blank');
        const htmlContent = this.generatePrintableHTML(analysisResults, language);
        
        printableWindow.document.write(htmlContent);
        printableWindow.document.close();
        
        printableWindow.onload = () => {
            printableWindow.print();
        };
    }
}

// Initialize PDF generator
window.pdfGenerator = new PDFGenerator();