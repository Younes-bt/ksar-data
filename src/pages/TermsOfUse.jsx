import React from 'react';

const TermsOfUsePage = ({
  language = 'en',
  theme = 'dark'
}) => {
  // Translations for the Terms of Use
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'شروط الاستخدام',
          lastUpdated: 'آخر تحديث: 14 أغسطس 2025',
          sections: [
            {
              title: '1. قبول الشروط',
              content: [
                'مرحبًا بك في KSAR DATA. من خلال الوصول إلى موقعنا واستخدامه، فإنك توافق على الالتزام بشروط الاستخدام هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدمتنا.'
              ]
            },
            {
              title: '2. وصف الخدمة',
              content: [
                'KSAR DATA هي مبادرة مجتمعية تقوم بجمع ومعالجة وتصوير البيانات العامة من الوثائق الرسمية لجعلها سهلة الوصول والفهم. يتم تقديم الخدمة مجانًا لأغراض إعلامية وتعليمية ولتعزيز المشاركة المدنية.'
              ]
            },
            {
              title: '3. استخدام البيانات والمحتوى',
              content: [
                '**الاستخدام المسموح به:** نشجعك على استخدام المعلومات والتصورات ومجموعات البيانات المتاحة على هذا الموقع لأغراض شخصية أو تعليمية أو صحفية أو بحثية، بشرط ذكر "KSAR DATA" كمصدر.',
                '**إخلاء المسؤولية عن الدقة:** البيانات المعروضة هي نتيجة لعملية استخلاص ومعالجة للوثائق الرسمية. على الرغم من أننا نسعى جاهدين لضمان أعلى دقة ممكنة، إلا أننا **لا نضمن أن المعلومات خالية من الأخطاء أو كاملة**. قد توجد أخطاء غير مقصودة.',
                '**تنبيه هام:** المعلومات المقدمة على هذا الموقع يجب **ألا تُستخدم أبدًا** لاتخاذ قرارات قانونية أو مالية أو تجارية. هي ليست بديلاً عن الوثائق الرسمية. لأي استخدام رسمي، يرجى الرجوع إلى المصادر الأولية الأصلية.'
              ]
            },
            {
                title: '4. الملكية الفكرية',
                content: [
                    '**محتوى الموقع:** تصميم الموقع والنصوص والرسومات والمظهر العام هي ملك لمبادرة KSAR DATA.',
                    '**البيانات:** البيانات الأولية الأصلية تنتمي إلى الملكية العامة أو الجهات الحكومية التي نشرتها. مجموعات البيانات المنقحة والمهيكلة التي ننتجها متاحة قدر الإمكان بموجب ترخيص مفتوح.',
                    '**الكود المصدري:** مشروع KSAR DATA هو مشروع مفتوح المصدر. الكود متاح ويخضع لشروط الترخيص الخاص به (مثل MIT).'
                ]
            },
            {
              title: '5. سلوك المستخدم',
              content: [
                'باستخدام هذا الموقع، فإنك توافق على عدم: استخدام الخدمة لأي أغراض غير قانونية؛ محاولة تعطيل عمل الموقع (على سبيل المثال، من خلال هجمات حجب الخدمة)؛ أو تحريف طبيعة البيانات أو المبادرة.'
              ]
            },
            {
              title: '6. تحديد المسؤولية',
              content: [
                'لن يكون مؤسسو أو مساهمو KSAR DATA مسؤولين بأي حال من الأحوال عن أي أضرار مباشرة أو غير مباشرة ناتجة عن استخدام أو عدم القدرة على استخدام المعلومات الموجودة على هذا الموقع. أنت تستخدم المعلومات المقدمة على مسؤوليتك الخاصة.'
              ]
            },
            {
              title: '7. القانون الحاكم',
              content: [
                'تخضع شروط الاستخدام هذه وتُفسر وفقًا لقوانين المغرب.'
              ]
            },
            {
              title: '8. اتصل بنا',
              content: [
                'لأية أسئلة تتعلق بهذه الشروط، يرجى الاتصال بنا على: ksardata@gmail.com.'
              ]
            }
          ]
        };
      case 'fr':
        return {
          title: 'Conditions d\'Utilisation',
          lastUpdated: 'Dernière mise à jour : 14 août 2025',
          sections: [
            {
              title: '1. Acceptation des conditions',
              content: [
                'Bienvenue sur KSAR DATA. En accédant à notre site web et en l\'utilisant, vous acceptez de vous conformer aux présentes conditions d\'utilisation. Si vous n\'êtes pas d\'accord avec une partie de ces conditions, veuillez ne pas utiliser notre service.'
              ]
            },
            {
              title: '2. Description du service',
              content: [
                'KSAR DATA est une initiative citoyenne qui collecte, traite et visualise des données publiques provenant de documents officiels pour les rendre accessibles et compréhensibles. Le service est fourni gratuitement à des fins d\'information, d\'éducation et d\'engagement civique.'
              ]
            },
            {
              title: '3. Utilisation des données et du contenu',
              content: [
                '**Usage autorisé :** Vous êtes encouragé à utiliser les informations, visualisations et ensembles de données disponibles sur ce site à des fins personnelles, éducatives, journalistiques ou de recherche, à condition de citer "KSAR DATA" comme source.',
                '**Absence de garantie :** Les données présentées sont le résultat d\'un processus d\'extraction et de traitement de documents officiels. Bien que nous nous efforcions de garantir la plus grande exactitude possible, **nous ne garantissons pas que les informations sont exemptes d\'erreurs ou complètes**. Des erreurs involontaires peuvent exister.',
                '**Clause de non-responsabilité :** Les informations fournies sur ce site ne doivent **jamais** être utilisées pour prendre des décisions légales, financières ou commerciales. Elles ne remplacent pas les documents officiels. Pour toute utilisation officielle, veuillez consulter les sources primaires originales.'
              ]
            },
            {
                title: '4. Propriété intellectuelle',
                content: [
                    '**Contenu du site :** La conception, le texte, les graphiques et l\'apparence générale du site sont la propriété de l\'initiative KSAR DATA.',
                    '**Données :** Les données brutes originales sont du domaine public ou la propriété des entités gouvernementales qui les ont publiées. Les ensembles de données nettoyés et structurés que nous produisons sont mis à disposition dans la mesure du possible sous une licence ouverte.',
                    '**Code source :** KSAR DATA est un projet open source. Le code est disponible et régi par les termes de sa licence spécifique (par exemple, MIT).'
                ]
            },
            {
              title: '5. Conduite de l\'utilisateur',
              content: [
                'En utilisant ce site, vous vous engagez à ne pas : Utiliser le service à des fins illégales ; Tenter de perturber le fonctionnement du site (par exemple, par des attaques par déni de service) ; ou Représenter faussement la nature des données ou de l\'initiative.'
              ]
            },
            {
              title: '6. Limitation de responsabilité',
              content: [
                'En aucun cas, les fondateurs ou contributeurs de KSAR DATA ne pourront être tenus responsables de tout dommage direct ou indirect résultant de l\'utilisation ou de l\'incapacité à utiliser les informations de ce site. Vous utilisez les informations fournies à vos propres risques.'
              ]
            },
            {
              title: '7. Droit applicable',
              content: [
                'Ces conditions d\'utilisation sont régies et interprétées conformément aux lois du Maroc.'
              ]
            },
            {
              title: '8. Nous contacter',
              content: [
                'Pour toute question relative à ces conditions, veuillez nous contacter à : ksardata@gmail.com.'
              ]
            }
          ]
        };
      default: // English
        return {
          title: 'Terms of Use',
          lastUpdated: 'Last Updated: August 14, 2025',
          sections: [
            {
              title: '1. Acceptance of Terms',
              content: [
                'Welcome to KSAR DATA. By accessing and using our website, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our service.'
              ]
            },
            {
              title: '2. Description of Service',
              content: [
                'KSAR DATA is a civic initiative that collects, processes, and visualizes public data from official documents to make it accessible and understandable. The service is provided free of charge for informational, educational, and civic engagement purposes.'
              ]
            },
            {
              title: '3. Use of Data and Content',
              content: [
                '**Permitted Use:** You are encouraged to use the information, visualizations, and datasets available on this site for personal, educational, journalistic, or research purposes, provided you credit "KSAR DATA" as the source.',
                '**No Warranty of Accuracy:** The data presented is the result of an extraction and processing workflow from official documents. While we strive for the highest possible accuracy, **we do not guarantee that the information is error-free or complete**. Unintentional errors may exist.',
                '**Disclaimer:** Information provided on this site should **never** be used for making legal, financial, or commercial decisions. It is not a substitute for official documents. For any official use, please consult the original primary sources.'
              ]
            },
            {
                title: '4. Intellectual Property',
                content: [
                    '**Site Content:** The design, text, graphics, and overall look and feel of the site are the property of the KSAR DATA initiative.',
                    '**Data:** The original raw data belongs to the public domain or the government entities that published it. The cleaned and structured datasets we produce are, where possible, made available under an open license.',
                    '**Source Code:** KSAR DATA is an open-source project. The code is available and governed by the terms of its specific license (e.g., MIT).'
                ]
            },
            {
              title: '5. User Conduct',
              content: [
                'By using this site, you agree not to: Use the service for any illegal purposes; Attempt to disrupt the functioning of the site (e.g., through denial-of-service attacks); or Misrepresent the nature of the data or the initiative.'
              ]
            },
            {
              title: '6. Limitation of Liability',
              content: [
                'In no event shall the founders or contributors of KSAR DATA be liable for any direct or indirect damages arising from the use of, or inability to use, the information on this site. You use the information provided at your own risk.'
              ]
            },
            {
              title: '7. Governing Law',
              content: [
                'These Terms of Use shall be governed and construed in accordance with the laws of Morocco.'
              ]
            },
            {
              title: '8. Contact Us',
              content: [
                'For any questions regarding these terms, please contact us at: ksardata@gmail.com.'
              ]
            }
          ]
        };
    }
  };

  const t = getTranslations();

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    gradientFrom: theme === 'dark' ? 'from-blue-900' : 'from-blue-50',
    gradientTo: theme === 'dark' ? 'to-gray-950' : 'to-gray-100'
  };

  return (
    <div
      className={`${themeClasses.bg} ${themeClasses.textPrimary}`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : { fontFamily: 'Inter, sans-serif' }}
    >
      {/* Hero Section */}
      <header className={`relative py-20 md:py-28 bg-gradient-to-b ${themeClasses.gradientFrom} ${themeClasses.gradientTo}`}>
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">
            {t.title}
          </h1>
          <p className={`text-lg ${themeClasses.textSecondary}`}>
            {t.lastUpdated}
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto space-y-12">
          {t.sections.map((section, index) => (
            <section key={index}>
              <h2 className={`text-xl font-bold mb-6 pb-2 border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                {section.title}
              </h2>
              <div className="space-y-4 text-md leading-relaxed">
                {section.content.map((paragraph, pIndex) => (
                  <p key={pIndex} className={themeClasses.textSecondary} dangerouslySetInnerHTML={{ __html: paragraph.replace('ksardata@gmail.com', `<a href="mailto:ksardata@gmail.com" class="underline ${themeClasses.textAccent}">${'ksardata@gmail.com'}</a>`) }} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default TermsOfUsePage;