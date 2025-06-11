// pages/certificates.js
import React from 'react';


const CertificateCard = () => {
    const studentCertificates = [
        { id: 1, name: 'شهادة تحفيظ القرآن', image: '/images/ghilafquran.png' },
        { id: 2, name: 'شهادة تفسير القرآن', image: '/images/ghilafquran.png' },
    ];

    return (
        <div className="p-4" dir="rtl">
            <h1 className="text-3xl font-bold text-center mb-6 text-green-500">شهادات الطلاب</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentCertificates.map(certificate => (
                    <CertificateCard key={certificate.id} name={certificate.name} image={certificate.image} />
                ))}
            </div>
        </div>
    );
};

export default CertificateCard;