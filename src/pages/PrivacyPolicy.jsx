import React from 'react';

const PrivacyPolicyPage = ({
  language = 'en',
  theme = 'dark'
}) => {
  // Translations for the Privacy Policy
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          title: 'سياسة الخصوصية',
          lastUpdated: 'آخر تحديث: 14 أغسطس 2025',
          sections: [
            {
              title: '1. مقدمة',
              content: [
                'KSAR DATA هي مبادرة محلية غير تجارية مكرسة لجعل البيانات العامة لمدينة القصر الكبير شفافة. احترام خصوصيتك هو أولوية بالنسبة لنا. توضح سياسة الخصوصية هذه المعلومات التي قد نجمعها وكيفية استخدامنا لها. استخدامك لموقعنا يعني موافقتك على الممارسات الموضحة في هذه الوثيقة.'
              ]
            },
            {
              title: '2. المعلومات التي نعالجها',
              content: [
                'المهمة الأساسية لمشروع KSAR DATA هي معالجة **بيانات عامة ومجهولة المصدر** من مصادر رسمية (تقارير الميزانية، الإحصاءات السكانية، إلخ). هذه البيانات تتعلق بالمدينة وليس بمستخدمي موقعنا.'
              ]
            },
            {
              title: '3. جمع المعلومات الشخصية',
              content: [
                'نحن **لا نجمع أي معلومات تعريف شخصية** تلقائيًا عند زيارتك لموقعنا. المعلومات الشخصية الوحيدة التي قد نحتفظ بها هي تلك التي تقدمها لنا **طواعية**:',
                '**عندما تتصل بنا:** إذا قمت بإرسال بريد إلكتروني إلينا أو تواصلت معنا عبر وسائل التواصل الاجتماعي، فإننا نجمع اسمك وعنوان بريدك الإلكتروني ومحتوى رسالتك لنتمكن من الرد عليك.'
              ]
            },
            {
              title: '4. كيفية استخدام معلوماتك',
              content: [
                'المعلومات الشخصية التي تقدمها طواعية تُستخدم فقط للغرض التالي: الرد على استفساراتك، اقتراحاتك، الإبلاغ عن الأخطاء، أو عروض التعاون.',
                'نحن نلتزم **بعدم بيع أو تأجير أو مشاركة** معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية أو لأي غرض آخر لا يتعلق بطلبك الأصلي.'
              ]
            },
            {
              title: '5. المعلومات غير الشخصية',
              content: [
                'مثل معظم مواقع الويب، قد تسجل خوادمنا معلومات غير شخصية بشكل مجهول، مثل نوع المتصفح، اللغة المفضلة، ووقت الزيارة. تُستخدم هذه المعلومات لأغراض إحصائية لفهم كيفية استخدام الزوار للموقع ولتحسين أدائه وأمانه. هذه المعلومات غير مرتبطة بهوية شخصية.'
              ]
            },
            {
                title: '6. أمن البيانات',
                content: [
                    'نحن نطبق إجراءات أمنية تقنية وتنظيمية معقولة لحماية الموقع. ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%.'
                ]
            },
            {
                title: '7. روابط لمواقع أخرى',
                content: [
                    'قد يحتوي موقعنا على روابط لمواقع خارجية (مثل فيسبوك). نحن لسنا مسؤولين عن المحتوى أو ممارسات الخصوصية لهذه المواقع الخارجية.'
                ]
            },
            {
              title: '8. التغييرات على هذه السياسة',
              content: [
                'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. نشجعك على مراجعة هذه الصفحة بانتظام للاطلاع على أي تغييرات.'
              ]
            },
            {
              title: '9. اتصل بنا',
              content: [
                'إذا كانت لديك أي أسئلة بخصوص سياسة الخصوصية هذه، يرجى الاتصال بنا على البريد الإلكتروني: ksardata@gmail.com.'
              ]
            }
          ]
        };
      case 'fr':
        return {
          title: 'Règles de Confidentialité',
          lastUpdated: 'Dernière mise à jour : 14 août 2025',
          sections: [
            {
              title: '1. Introduction',
              content: [
                'KSAR DATA ("nous", "notre") est une initiative locale et non commerciale dédiée à la transparence des données publiques de la ville de Ksar El Kebir. Le respect de votre vie privée est une priorité. Cette politique de confidentialité explique quelles informations nous pouvons collecter et comment nous les utilisons. L\'utilisation de notre site signifie que vous acceptez les pratiques décrites dans ce document.'
              ]
            },
            {
              title: '2. Les informations que nous traitons',
              content: [
                'La mission principale de KSAR DATA est de traiter des **données publiques et anonymes** provenant de sources officielles (rapports budgétaires, recensements, etc.). Ces données concernent la ville et non les utilisateurs de notre site.'
              ]
            },
            {
              title: '3. Collecte d\'informations personnelles',
              content: [
                'Nous ne collectons **aucune information personnelle identifiable** de manière automatique lorsque vous visitez notre site. Les seules informations personnelles que nous pourrions détenir sont celles que vous nous fournissez **volontairement** :',
                '**Lorsque vous nous contactez :** Si vous nous envoyez un e-mail ou nous contactez via les réseaux sociaux, nous collectons votre nom, votre adresse e-mail et le contenu de votre message afin de pouvoir vous répondre.'
              ]
            },
            {
              title: '4. Utilisation de vos informations',
              content: [
                'Les informations personnelles que vous nous fournissez volontairement ne sont utilisées que dans le but suivant : Répondre à vos questions, suggestions, rapports d\'erreur ou propositions de collaboration.',
                'Nous nous engageons à **ne pas vendre, louer ou partager** vos informations personnelles avec des tiers à des fins de marketing ou à toute autre fin non liée à votre demande initiale.'
              ]
            },
            {
              title: '5. Informations non personnelles',
              content: [
                'Comme la plupart des sites web, nos serveurs peuvent enregistrer des informations non personnelles de manière anonyme, telles que le type de navigateur, la langue de préférence et l\'heure de la visite. Ces informations sont utilisées à des fins statistiques pour mieux comprendre comment les visiteurs utilisent le site et pour en améliorer la performance et la sécurité. Elles ne sont pas liées à une identité personnelle.'
              ]
            },
            {
                title: '6. Sécurité des données',
                content: [
                    'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles raisonnables pour protéger le site. Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n\'est sûre à 100 %.'
                ]
            },
            {
                title: '7. Liens vers d\'autres sites',
                content: [
                    'Notre site peut contenir des liens vers des sites externes (comme Facebook). Nous ne sommes pas responsables du contenu ou des pratiques de confidentialité de ces sites tiers.'
                ]
            },
            {
              title: '8. Modifications de cette politique',
              content: [
                'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous encourageons à consulter cette page régulièrement pour prendre connaissance de tout changement.'
              ]
            },
            {
              title: '9. Nous contacter',
              content: [
                'Si vous avez des questions concernant cette politique de confidentialité, veuillez nous contacter à l\'adresse suivante : ksardata@gmail.com.'
              ]
            }
          ]
        };
      default: // English
        return {
          title: 'Privacy Policy',
          lastUpdated: 'Last Updated: August 14, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: [
                'KSAR DATA ("we", "us", "our") is a local, non-commercial initiative dedicated to making the public data of Ksar El Kebir transparent. Respecting your privacy is a priority. This Privacy Policy explains what information we may collect and how we use it. By using our site, you agree to the practices described in this document.'
              ]
            },
            {
              title: '2. The Information We Process',
              content: [
                'The core mission of KSAR DATA is to process **public, anonymous data** from official sources (budget reports, census data, etc.). This data is about the city, not about the users of our website.'
              ]
            },
            {
              title: '3. Collection of Personal Information',
              content: [
                'We do **not** automatically collect any personally identifiable information when you visit our site. The only personal information we may hold is what you **voluntarily** provide to us:',
                '**When you contact us:** If you send us an email or contact us via social media, we collect your name, email address, and the content of your message in order to respond to you.'
              ]
            },
            {
              title: '4. How We Use Your Information',
              content: [
                'Personal information that you voluntarily provide is used only for the following purpose: To respond to your questions, suggestions, error reports, or collaboration proposals.',
                'We are committed to **not selling, renting, or sharing** your personal information with third parties for marketing or any other purpose not related to your initial request.'
              ]
            },
            {
              title: '5. Non-Personal Information',
              content: [
                'Like most websites, our servers may log non-personal information anonymously, such as browser type, language preference, and the time of your visit. This information is used for statistical purposes to better understand how visitors use the site and to improve its performance and security. It is not linked to a personal identity.'
              ]
            },
            {
                title: '6. Data Security',
                content: [
                    'We implement reasonable technical and organizational security measures to protect the site. However, no method of transmission over the Internet or electronic storage is 100% secure.'
                ]
            },
            {
                title: '7. Links to Other Sites',
                content: [
                    'Our site may contain links to external sites (like Facebook). We are not responsible for the content or privacy practices of these third-party sites.'
                ]
            },
            {
              title: '8. Changes to This Policy',
              content: [
                'We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes.'
              ]
            },
            {
              title: '9. Contact Us',
              content: [
                'If you have any questions about this Privacy Policy, please contact us at: ksardata@gmail.com.'
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

export default PrivacyPolicyPage;