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
          lastUpdated: 'آخر تحديث: 15 أغسطس 2025',
          sections: [
            {
              title: '1. مقدمة',
              content: [
                'KSAR DATA هي مبادرة محلية غير تجارية مكرسة لجعل البيانات العامة لمدينة القصر الكبير شفافة. احترام خصوصيتك هو أولوية بالنسبة لنا. توضح سياسة الخصوصية هذه المعلومات التي قد نجمعها وكيفية استخدامنا لها وحقوقك فيما يتعلق بمعلوماتك الشخصية. استخدامك لموقعنا يعني موافقتك على الممارسات الموضحة في هذه الوثيقة.'
              ]
            },
            {
              title: '2. المعلومات التي نعالجها',
              content: [
                'المهمة الأساسية لمشروع KSAR DATA هي معالجة **بيانات عامة ومفتوحة المصدر** من مصادر رسمية (تقارير الميزانية، الإحصاءات السكانية، إلخ). هذه البيانات تتعلق بالمدينة وليس بمستخدمي موقعنا.',
                'نحن لا نجمع أو نعالج أي بيانات شخصية حساسة مثل المعلومات الصحية أو المالية أو السياسية.'
              ]
            },
            {
              title: '3. جمع المعلومات الشخصية',
              content: [
                'نحن **لا نجمع أي معلومات تعريف شخصية** تلقائيًا عند زيارتك لموقعنا. المعلومات الشخصية الوحيدة التي قد نحتفظ بها هي تلك التي تقدمها لنا **طواعية**:',
                '**عندما تتصل بنا:** إذا قمت بإرسال بريد إلكتروني إلينا أو تواصلت معنا عبر وسائل التواصل الاجتماعي، فإننا نجمع اسمك وعنوان بريدك الإلكتروني ومحتوى رسالتك لنتمكن من الرد عليك.',
                '**الاشتراكات الطوعية:** إذا اخترت الاشتراك في التحديثات أو النشرات الإخبارية، فإننا نجمع عنوان بريدك الإلكتروني لهذا الغرض المحدد.'
              ]
            },
            {
              title: '4. كيفية استخدام معلوماتك',
              content: [
                'المعلومات الشخصية التي تقدمها طواعية تُستخدم فقط للأغراض التالية:',
                '• الرد على استفساراتك واقتراحاتك والإبلاغ عن الأخطاء أو عروض التعاون',
                '• إرسال التحديثات إذا طلبت ذلك صراحة',
                '• تحسين خدماتنا بناءً على ملاحظاتك',
                'نحن نلتزم **بعدم بيع أو تأجير أو مشاركة** معلوماتك الشخصية مع أطراف ثالثة لأغراض تسويقية أو لأي غرض آخر لا يتعلق بطلبك الأصلي.'
              ]
            },
            {
              title: '5. المعلومات غير الشخصية والكوكيز',
              content: [
                'مثل معظم مواقع الويب، قد تسجل خوادمنا معلومات غير شخصية بشكل مجهول، مثل نوع المتصفح، اللغة المفضلة، ووقت الزيارة وعنوان IP. تُستخدم هذه المعلومات لأغراض إحصائية لفهم كيفية استخدام الزوار للموقع ولتحسين أدائه وأمانه.',
                'نحن لا نستخدم حاليًا ملفات تعريف الارتباط (الكوكيز) لتتبع المستخدمين. إذا تغير هذا في المستقبل، سنقوم بتحديث هذه السياسة وإشعارك.',
                'قد نستخدم خدمات تحليلية مجهولة لفهم أنماط الاستخدام بشكل أفضل. هذه الخدمات لا تجمع معلومات شخصية قابلة للتحديد.'
              ]
            },
            {
                title: '6. أمن البيانات واستبقاؤها',
                content: [
                    'نحن نطبق إجراءات أمنية تقنية وتنظيمية معقولة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو الكشف أو التغيير أو التدمير.',
                    'نحتفظ بمعلوماتك الشخصية فقط طالما كان ذلك ضروريًا لتحقيق الأغراض المحددة في هذه السياسة أو كما هو مطلوب قانونيًا.',
                    'ومع ذلك، لا توجد وسيلة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100%. نحن نسعى جاهدين لحماية معلوماتك الشخصية ولكن لا يمكننا ضمان الأمان المطلق.'
                ]
            },
            {
                title: '7. حقوقك',
                content: [
                    'لديك الحقوق التالية فيما يتعلق بمعلوماتك الشخصية:',
                    '• **الحق في الوصول:** يمكنك طلب نسخة من المعلومات الشخصية التي نحتفظ بها عنك',
                    '• **الحق في التصحيح:** يمكنك طلب تصحيح أي معلومات غير دقيقة',
                    '• **الحق في الحذف:** يمكنك طلب حذف معلوماتك الشخصية',
                    '• **الحق في إلغاء الاشتراك:** يمكنك إلغاء الاشتراك من أي اتصالات في أي وقت',
                    'لممارسة أي من هذه الحقوق، يرجى الاتصال بنا على ksardata@gmail.com.'
                ]
            },
            {
                title: '8. روابط لمواقع أخرى',
                content: [
                    'قد يحتوي موقعنا على روابط لمواقع خارجية (مثل فيسبوك أو المصادر الحكومية). نحن لسنا مسؤولين عن المحتوى أو ممارسات الخصوصية لهذه المواقع الخارجية.',
                    'نشجعك على مراجعة سياسات الخصوصية لأي مواقع تابعة لجهات خارجية تزورها.'
                ]
            },
            {
              title: '9. القانون المعمول به',
              content: [
                'تخضع سياسة الخصوصية هذه لقوانين المغرب. نحن نسعى أيضًا للامتثال لأفضل الممارسات الدولية في مجال حماية البيانات.'
              ]
            },
            {
              title: '10. التغييرات على هذه السياسة',
              content: [
                'قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر. سنخطرك بأي تغييرات جوهرية من خلال نشر السياسة الجديدة على موقعنا مع تاريخ "آخر تحديث" محدث.',
                'نشجعك على مراجعة هذه الصفحة بانتظام للاطلاع على أي تغييرات.'
              ]
            },
            {
              title: '11. اتصل بنا',
              content: [
                'إذا كانت لديك أي أسئلة بخصوص سياسة الخصوصية هذه أو ترغب في ممارسة حقوقك، يرجى الاتصال بنا على:',
                'البريد الإلكتروني: ksardata@gmail.com',
                'سنقوم بالرد على استفسارك في غضون 30 يومًا من تلقيه.'
              ]
            }
          ]
        };
      case 'fr':
        return {
          title: 'Politique de Confidentialité',
          lastUpdated: 'Dernière mise à jour : 15 août 2025',
          sections: [
            {
              title: '1. Introduction',
              content: [
                'KSAR DATA ("nous", "notre") est une initiative locale et non commerciale dédiée à la transparence des données publiques de la ville de Ksar El Kebir. Le respect de votre vie privée est une priorité. Cette politique de confidentialité explique quelles informations nous pouvons collecter, comment nous les utilisons et vos droits concernant vos informations personnelles. L\'utilisation de notre site signifie que vous acceptez les pratiques décrites dans ce document.'
              ]
            },
            {
              title: '2. Les informations que nous traitons',
              content: [
                'La mission principale de KSAR DATA est de traiter des **données publiques** provenant de sources officielles (rapports budgétaires, recensements, etc.). Ces données concernent la ville et non les utilisateurs de notre site.',
                'Nous ne collectons ni ne traitons aucune donnée personnelle sensible telle que des informations de santé, financières ou politiques.'
              ]
            },
            {
              title: '3. Collecte d\'informations personnelles',
              content: [
                'Nous ne collectons **aucune information personnelle identifiable** de manière automatique lorsque vous visitez notre site. Les seules informations personnelles que nous pourrions détenir sont celles que vous nous fournissez **volontairement** :',
                '**Lorsque vous nous contactez :** Si vous nous envoyez un e-mail ou nous contactez via les réseaux sociaux, nous collectons votre nom, votre adresse e-mail et le contenu de votre message afin de pouvoir vous répondre.',
                '**Abonnements volontaires :** Si vous choisissez de vous abonner aux mises à jour ou newsletters, nous collectons votre adresse e-mail à cette fin spécifique.'
              ]
            },
            {
              title: '4. Utilisation de vos informations',
              content: [
                'Les informations personnelles que vous nous fournissez volontairement ne sont utilisées que dans les buts suivants :',
                '• Répondre à vos questions, suggestions, rapports d\'erreur ou propositions de collaboration',
                '• Envoyer des mises à jour si vous les avez explicitement demandées',
                '• Améliorer nos services en fonction de vos commentaires',
                'Nous nous engageons à **ne pas vendre, louer ou partager** vos informations personnelles avec des tiers à des fins de marketing ou à toute autre fin non liée à votre demande initiale.'
              ]
            },
            {
              title: '5. Informations non personnelles et cookies',
              content: [
                'Comme la plupart des sites web, nos serveurs peuvent enregistrer des informations non personnelles de manière anonyme, telles que le type de navigateur, la langue de préférence, l\'heure de la visite et l\'adresse IP. Ces informations sont utilisées à des fins statistiques pour mieux comprendre comment les visiteurs utilisent le site et pour en améliorer la performance et la sécurité.',
                'Nous n\'utilisons actuellement pas de cookies pour suivre les utilisateurs. Si cela change à l\'avenir, nous mettrons à jour cette politique et vous en informerons.',
                'Nous pouvons utiliser des services d\'analyse anonymes pour mieux comprendre les modèles d\'utilisation. Ces services ne collectent pas d\'informations personnelles identifiables.'
              ]
            },
            {
                title: '6. Sécurité des données et rétention',
                content: [
                    'Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles raisonnables pour protéger vos informations personnelles contre l\'accès non autorisé, la divulgation, l\'altération ou la destruction.',
                    'Nous ne conservons vos informations personnelles que le temps nécessaire pour atteindre les objectifs décrits dans cette politique ou selon les exigences légales.',
                    'Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n\'est sûre à 100 %. Nous nous efforçons de protéger vos informations personnelles mais ne pouvons garantir une sécurité absolue.'
                ]
            },
            {
                title: '7. Vos droits',
                content: [
                    'Vous disposez des droits suivants concernant vos informations personnelles :',
                    '• **Droit d\'accès :** Vous pouvez demander une copie des informations personnelles que nous détenons sur vous',
                    '• **Droit de rectification :** Vous pouvez demander la correction de toute information inexacte',
                    '• **Droit d\'effacement :** Vous pouvez demander la suppression de vos informations personnelles',
                    '• **Droit de désabonnement :** Vous pouvez vous désabonner de toute communication à tout moment',
                    'Pour exercer l\'un de ces droits, veuillez nous contacter à ksardata@gmail.com.'
                ]
            },
            {
                title: '8. Liens vers d\'autres sites',
                content: [
                    'Notre site peut contenir des liens vers des sites externes (comme Facebook ou des sources gouvernementales). Nous ne sommes pas responsables du contenu ou des pratiques de confidentialité de ces sites tiers.',
                    'Nous vous encourageons à consulter les politiques de confidentialité de tous les sites tiers que vous visitez.'
                ]
            },
            {
              title: '9. Droit applicable',
              content: [
                'Cette politique de confidentialité est régie par les lois du Maroc. Nous nous efforçons également de respecter les meilleures pratiques internationales en matière de protection des données.'
              ]
            },
            {
              title: '10. Modifications de cette politique',
              content: [
                'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Nous vous informerons de tout changement important en publiant la nouvelle politique sur notre site avec une date de "dernière mise à jour" mise à jour.',
                'Nous vous encourageons à consulter cette page régulièrement pour prendre connaissance de tout changement.'
              ]
            },
            {
              title: '11. Nous contacter',
              content: [
                'Si vous avez des questions concernant cette politique de confidentialité ou souhaitez exercer vos droits, veuillez nous contacter à :',
                'E-mail : ksardata@gmail.com',
                'Nous répondrons à votre demande dans un délai de 30 jours après réception.'
              ]
            }
          ]
        };
      default: // English
        return {
          title: 'Privacy Policy',
          lastUpdated: 'Last Updated: August 15, 2025',
          sections: [
            {
              title: '1. Introduction',
              content: [
                'KSAR DATA ("we", "us", "our") is a local, non-commercial initiative dedicated to making the public data of Ksar El Kebir transparent. Respecting your privacy is a priority. This Privacy Policy explains what information we may collect, how we use it, and your rights regarding your personal information. By using our site, you agree to the practices described in this document.'
              ]
            },
            {
              title: '2. The Information We Process',
              content: [
                'The core mission of KSAR DATA is to process **public, Open data** from official sources (budget reports, census data, etc.). This data is about the city, not about the users of our website.',
                'We do not collect or process any sensitive personal data such as health, financial, or political information.'
              ]
            },
            {
              title: '3. Collection of Personal Information',
              content: [
                'We do **not** automatically collect any personally identifiable information when you visit our site. The only personal information we may hold is what you **voluntarily** provide to us:',
                '**When you contact us:** If you send us an email or contact us via social media, we collect your name, email address, and the content of your message in order to respond to you.',
                '**Voluntary subscriptions:** If you choose to subscribe to updates or newsletters, we collect your email address for this specific purpose.'
              ]
            },
            {
              title: '4. How We Use Your Information',
              content: [
                'Personal information that you voluntarily provide is used only for the following purposes:',
                '• To respond to your questions, suggestions, error reports, or collaboration proposals',
                '• To send updates if you have explicitly requested them',
                '• To improve our services based on your feedback',
                'We are committed to **not selling, renting, or sharing** your personal information with third parties for marketing or any other purpose not related to your initial request.'
              ]
            },
            {
              title: '5. Non-Personal Information and Cookies',
              content: [
                'Like most websites, our servers may log non-personal information anonymously, such as browser type, language preference, time of visit, and IP address. This information is used for statistical purposes to better understand how visitors use the site and to improve its performance and security.',
                'We do not currently use cookies to track users. If this changes in the future, we will update this policy and notify you.',
                'We may use anonymous analytics services to better understand usage patterns. These services do not collect personally identifiable information.'
              ]
            },
            {
                title: '6. Data Security and Retention',
                content: [
                    'We implement reasonable technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction.',
                    'We retain your personal information only as long as necessary to fulfill the purposes outlined in this policy or as required by law.',
                    'However, no method of transmission over the Internet or electronic storage is 100% secure. We strive to protect your personal information but cannot guarantee absolute security.'
                ]
            },
            {
                title: '7. Your Rights',
                content: [
                    'You have the following rights regarding your personal information:',
                    '• **Right to access:** You can request a copy of the personal information we hold about you',
                    '• **Right to rectification:** You can request correction of any inaccurate information',
                    '• **Right to erasure:** You can request deletion of your personal information',
                    '• **Right to unsubscribe:** You can opt out of any communications at any time',
                    'To exercise any of these rights, please contact us at ksardata@gmail.com.'
                ]
            },
            {
                title: '8. Links to Other Sites',
                content: [
                    'Our site may contain links to external sites (like Facebook or government sources). We are not responsible for the content or privacy practices of these third-party sites.',
                    'We encourage you to review the privacy policies of any third-party sites you visit.'
                ]
            },
            {
              title: '9. Applicable Law',
              content: [
                'This Privacy Policy is governed by the laws of Morocco. We also strive to comply with international best practices for data protection.'
              ]
            },
            {
              title: '10. Changes to This Policy',
              content: [
                'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on our site with an updated "Last Updated" date.',
                'We encourage you to review this page periodically for any changes.'
              ]
            },
            {
              title: '11. Contact Us',
              content: [
                'If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us at:',
                'Email: ksardata@gmail.com',
                'We will respond to your inquiry within 30 days of receipt.'
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
                  <p key={pIndex} className={themeClasses.textSecondary} dangerouslySetInnerHTML={{ __html: paragraph.replace(/ksardata@gmail\.com/g, `<a href="mailto:ksardata@gmail.com" class="underline ${themeClasses.textAccent}">ksardata@gmail.com</a>`) }} />
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