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
          lastUpdated: 'آخر تحديث: 15 أغسطس 2025',
          sections: [
            {
              title: '1. قبول الشروط',
              content: [
                'مرحبًا بك في KSAR DATA. من خلال الوصول إلى موقعنا واستخدامه، فإنك توافق على الالتزام بشروط الاستخدام هذه والامتثال لها. إذا كنت لا توافق على أي جزء من هذه الشروط، يرجى عدم استخدام خدمتنا.'              ]
            },
            {
              title: '2. وصف الخدمة',
              content: [
                'KSAR DATA هي مبادرة مجتمعية تقوم بجمع ومعالجة وتصوير البيانات العامة من الوثائق الرسمية لجعلها سهلة الوصول والفهم. يتم تقديم الخدمة مجانًا لأغراض إعلامية وتعليمية ولتعزيز المشاركة المدنية.',
                'نحتفظ بالحق في تعديل أو إيقاف أو تعليق الخدمة في أي وقت دون إشعار مسبق.'
              ]
            },
            {
              title: '3. استخدام البيانات والمحتوى',
              content: [
                '**الاستخدام المسموح به:** نشجعك على استخدام المعلومات والتصورات ومجموعات البيانات المتاحة على هذا الموقع لأغراض شخصية أو تعليمية أو صحفية أو بحثية، بشرط ذكر "KSAR DATA" كمصدر.',
                '**الاستخدام المحظور:** يُحظر استخدام البيانات لأغراض غير قانونية، أو لإنشاء محتوى مضلل، أو لأغراض تجارية دون إذن صريح.',
                '**إخلاء المسؤولية عن الدقة:** البيانات المعروضة هي نتيجة لعملية استخلاص ومعالجة للوثائق الرسمية. على الرغم من أننا نسعى جاهدين لضمان أعلى دقة ممكنة، إلا أننا **لا نضمن أن المعلومات خالية من الأخطاء أو كاملة أو محدثة**. قد توجد أخطاء غير مقصودة أو تأخيرات في التحديث.',
                '**تنبيه هام:** المعلومات المقدمة على هذا الموقع يجب **ألا تُستخدم أبدًا** لاتخاذ قرارات قانونية أو مالية أو تجارية أو طبية. هي ليست بديلاً عن الوثائق الرسمية أو الاستشارة المهنية. لأي استخدام رسمي، يرجى الرجوع إلى المصادر الأولية الأصلية أو استشارة خبير مؤهل.'
              ]
            },
            {
                title: '4. الملكية الفكرية',
                content: [
                    '**محتوى الموقع:** تصميم الموقع والنصوص والرسومات والمظهر العام هي ملك لمبادرة KSAR DATA وحقوق الطبع والنشر محفوظة.',
                    '**البيانات:** البيانات الأولية الأصلية تنتمي إلى الملكية العامة أو الجهات الحكومية التي نشرتها. مجموعات البيانات المنقحة والمهيكلة التي ننتجها متاحة قدر الإمكان بموجب ترخيص Creative Commons Attribution 4.0.',
                    '**الكود المصدري:** مشروع KSAR DATA هو مشروع مفتوح المصدر. الكود متاح ويخضع لشروط ترخيص MIT أو ترخيص مشابه.',

                ]
            },
            {
              title: '5. سلوك المستخدم',
              content: [
                'باستخدام هذا الموقع، فإنك توافق على عدم:',
                '• استخدام الخدمة لأي أغراض غير قانونية أو غير مصرح بها',
                '• محاولة تعطيل عمل الموقع أو إتلاف أنظمته (على سبيل المثال، من خلال هجمات حجب الخدمة أو البرامج الضارة)',
                '• تحريف طبيعة البيانات أو المبادرة أو نشر معلومات مضللة باسم KSAR DATA',
                '• محاولة الوصول غير المصرح به إلى أنظمتنا أو بيانات المستخدمين الآخرين',
                '• انتهاك حقوق الآخرين أو القوانين المعمول بها'
              ]
            },
            {
              title: '6. إخلاء المسؤولية وحدود الضمان',
              content: [
                'يتم تقديم هذا الموقع والمعلومات الموجودة عليه "كما هي" و "حسب توفرها" دون أي ضمانات صريحة أو ضمنية.',
                'نحن لا نضمن أن:',
                '• الموقع سيعمل دون انقطاع أو خالٍ من الأخطاء',
                '• المعلومات دقيقة أو محدثة أو كاملة',
                '• الموقع آمن من الفيروسات أو المكونات الضارة الأخرى',
                'استخدامك للموقع على مسؤوليتك الخاصة.'
              ]
            },
            {
              title: '7. تحديد المسؤولية',
              content: [
                'لن يكون مؤسسو أو مساهمو أو شركاء KSAR DATA مسؤولين بأي حال من الأحوال عن أي أضرار مباشرة أو غير مباشرة أو عرضية أو خاصة أو تبعية ناتجة عن:',
                '• استخدام أو عدم القدرة على استخدام الموقع أو المعلومات',
                '• اعتمادك على أي معلومات مقدمة على الموقع',
                '• أي أخطاء أو حذف في المحتوى',
                '• أي انقطاع أو تعليق للخدمة',
                'الحد الأقصى لمسؤوليتنا، إن وجدت، لن يتجاوز المبلغ الذي دفعته (إن وجد) للوصول إلى الخدمة.'
              ]
            },
            {
              title: '8. التعويض',
              content: [
                'توافق على تعويض والدفاع عن وحماية KSAR DATA ومؤسسيها ومساهميها من وضد أي مطالبات أو أضرار أو التزامات أو خسائر أو تكاليف ناشئة عن استخدامك للموقع أو انتهاكك لهذه الشروط.'
              ]
            },
            {
              title: '9. فصل الخدمة والإنهاء',
              content: [
                'نحتفظ بالحق في إنهاء أو تعليق وصولك إلى الموقع فورًا ودون إشعار مسبق لأي سبب، بما في ذلك انتهاك هذه الشروط.',
                'عند الإنهاء، ستبقى أحكام هذه الشروط التي تنطبق بطبيعتها بعد الإنهاء سارية المفعول.'
              ]
            },
            {
              title: '10. القانون الحاكم وحل النزاعات',
              content: [
                'تخضع شروط الاستخدام هذه وتُفسر وفقًا لقوانين المغرب دون الاعتداد بأحكام تضارب القوانين.',
                'أي نزاع ناشئ عن أو متعلق بهذه الشروط أو استخدام الموقع سيتم حله أولاً من خلال المفاوضات الودية. إذا لم تنجح المفاوضات، فستكون المحاكم المغربية المختصة هي المحاكم ذات الاختصاص الحصري.'
              ]
            },
            {
              title: '11. أحكام عامة',
              content: [
                '**القابلية للفصل:** إذا تبين أن أي حكم من هذه الشروط غير قابل للتنفيذ، فإن باقي الأحكام ستبقى سارية المفعول.',
                '**التعديلات:** نحتفظ بالحق في تعديل هذه الشروط في أي وقت. التعديلات الجوهرية ستُعلن على الموقع.',
                '**التنازل:** عدم إنفاذنا لأي حكم لا يُعتبر تنازلاً عن حقنا في إنفاذه لاحقًا.',
                '**الاتفاقية الكاملة:** تشكل هذه الشروط الاتفاقية الكاملة بيننا وبينك.'
              ]
            },
            {
              title: '12. اتصل بنا',
              content: [
                'لأية أسئلة تتعلق بهذه الشروط أو للإبلاغ عن انتهاكات، يرجى الاتصال بنا على:',
                'البريد الإلكتروني: ksardata@gmail.com',
                'سنرد على استفسارك في غضون 15 يوم عمل.'
              ]
            }
          ]
        };
      case 'fr':
        return {
          title: 'Conditions d\'Utilisation',
          lastUpdated: 'Dernière mise à jour : 15 août 2025',
          sections: [
            {
              title: '1. Acceptation des conditions',
              content: [
                'Bienvenue sur KSAR DATA. En accédant à notre site web et en l\'utilisant, vous acceptez de vous conformer aux présentes conditions d\'utilisation et d\'être lié par elles. Si vous n\'êtes pas d\'accord avec une partie de ces conditions, veuillez ne pas utiliser notre service.'              ]
            },
            {
              title: '2. Description du service',
              content: [
                'KSAR DATA est une initiative citoyenne qui collecte, traite et visualise des données publiques provenant de documents officiels pour les rendre accessibles et compréhensibles. Le service est fourni gratuitement à des fins d\'information, d\'éducation et d\'engagement civique.',
                'Nous nous réservons le droit de modifier, suspendre ou interrompre le service à tout moment sans préavis.'
              ]
            },
            {
              title: '3. Utilisation des données et du contenu',
              content: [
                '**Usage autorisé :** Vous êtes encouragé à utiliser les informations, visualisations et ensembles de données disponibles sur ce site à des fins personnelles, éducatives, journalistiques ou de recherche, à condition de citer "KSAR DATA" comme source.',
                '**Usage interdit :** Il est interdit d\'utiliser les données à des fins illégales, pour créer du contenu trompeur, ou à des fins commerciales sans autorisation explicite.',
                '**Absence de garantie de précision :** Les données présentées sont le résultat d\'un processus d\'extraction et de traitement de documents officiels. Bien que nous nous efforcions de garantir la plus grande exactitude possible, **nous ne garantissons pas que les informations sont exemptes d\'erreurs, complètes ou à jour**. Des erreurs involontaires ou des retards de mise à jour peuvent exister.',
                '**Clause de non-responsabilité :** Les informations fournies sur ce site ne doivent **jamais** être utilisées pour prendre des décisions légales, financières, commerciales ou médicales. Elles ne remplacent pas les documents officiels ou les conseils professionnels. Pour toute utilisation officielle, veuillez consulter les sources primaires originales ou consulter un expert qualifié.'
              ]
            },
            {
                title: '4. Propriété intellectuelle',
                content: [
                    '**Contenu du site :** La conception, le texte, les graphiques et l\'apparence générale du site sont la propriété de l\'initiative KSAR DATA et sont protégés par des droits d\'auteur.',
                    '**Données :** Les données brutes originales sont du domaine public ou la propriété des entités gouvernementales qui les ont publiées. Les ensembles de données nettoyés et structurés que nous produisons sont, dans la mesure du possible, mis à disposition sous licence Creative Commons Attribution 4.0.',
                    '**Code source :** KSAR DATA est un projet open source. Le code est disponible et régi par les termes de la licence MIT ou similaire.',
                    '**Marques commerciales :** Le nom "KSAR DATA" et tous logos associés sont des propriétés intellectuelles protégées.'
                ]
            },
            {
              title: '5. Conduite de l\'utilisateur',
              content: [
                'En utilisant ce site, vous vous engagez à ne pas :',
                '• Utiliser le service à des fins illégales ou non autorisées',
                '• Tenter de perturber le fonctionnement du site ou d\'endommager ses systèmes (par exemple, par des attaques par déni de service ou des logiciels malveillants)',
                '• Représenter faussement la nature des données ou de l\'initiative ou publier des informations trompeuses au nom de KSAR DATA',
                '• Tenter un accès non autorisé à nos systèmes ou aux données d\'autres utilisateurs',
                '• Violer les droits d\'autrui ou les lois applicables'
              ]
            },
            {
              title: '6. Clause de non-responsabilité et limitations de garantie',
              content: [
                'Ce site et les informations qu\'il contient sont fournis "en l\'état" et "selon disponibilité" sans aucune garantie expresse ou implicite.',
                'Nous ne garantissons pas que :',
                '• Le site fonctionnera sans interruption ou sans erreur',
                '• Les informations sont exactes, à jour ou complètes',
                '• Le site est exempt de virus ou d\'autres composants nuisibles',
                'Vous utilisez le site à vos propres risques.'
              ]
            },
            {
              title: '7. Limitation de responsabilité',
              content: [
                'En aucun cas, les fondateurs, contributeurs ou partenaires de KSAR DATA ne pourront être tenus responsables de tout dommage direct, indirect, accessoire, spécial ou consécutif résultant de :',
                '• L\'utilisation ou l\'incapacité à utiliser le site ou les informations',
                '• Votre confiance en toute information fournie sur le site',
                '• Toute erreur ou omission dans le contenu',
                '• Toute interruption ou suspension du service',
                'Notre responsabilité maximale, le cas échéant, ne dépassera pas le montant que vous avez payé (le cas échéant) pour accéder au service.'
              ]
            },
            {
              title: '8. Indemnisation',
              content: [
                'Vous acceptez d\'indemniser, de défendre et de tenir KSAR DATA et ses fondateurs et contributeurs à l\'abri de toute réclamation, dommage, responsabilité, perte ou coût découlant de votre utilisation du site ou de votre violation de ces conditions.'
              ]
            },
            {
              title: '9. Suspension du service et résiliation',
              content: [
                'Nous nous réservons le droit de résilier ou de suspendre votre accès au site immédiatement et sans préavis pour quelque raison que ce soit, y compris la violation de ces conditions.',
                'En cas de résiliation, les dispositions de ces conditions qui s\'appliquent par nature après la résiliation resteront en vigueur.'
              ]
            },
            {
              title: '10. Droit applicable et résolution des litiges',
              content: [
                'Ces conditions d\'utilisation sont régies et interprétées conformément aux lois du Maroc, sans égard aux dispositions relatives aux conflits de lois.',
                'Tout litige découlant de ou lié à ces conditions ou à l\'utilisation du site sera d\'abord résolu par des négociations amicales. Si les négociations échouent, les tribunaux marocains compétents auront juridiction exclusive.'
              ]
            },
            {
              title: '11. Dispositions générales',
              content: [
                '**Divisibilité :** Si une disposition de ces conditions s\'avère inapplicable, les dispositions restantes resteront en vigueur.',
                '**Modifications :** Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications importantes seront annoncées sur le site.',
                '**Renonciation :** Notre défaut d\'application d\'une disposition ne constitue pas une renonciation à notre droit de l\'appliquer ultérieurement.',
                '**Accord complet :** Ces conditions constituent l\'accord complet entre nous et vous.'
              ]
            },
            {
              title: '12. Nous contacter',
              content: [
                'Pour toute question relative à ces conditions ou pour signaler des violations, veuillez nous contacter à :',
                'E-mail : ksardata@gmail.com',
                'Nous répondrons à votre demande dans un délai de 15 jours ouvrables.'
              ]
            }
          ]
        };
      default: // English
        return {
          title: 'Terms of Use',
          lastUpdated: 'Last Updated: August 15, 2025',
          sections: [
            {
              title: '1. Acceptance of Terms',
              content: [
                'Welcome to KSAR DATA. By accessing and using our website, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our service.'              ]
            },
            {
              title: '2. Description of Service',
              content: [
                'KSAR DATA is a civic initiative that collects, processes, and visualizes public data from official documents to make it accessible and understandable. The service is provided free of charge for informational, educational, and civic engagement purposes.',
                'We reserve the right to modify, suspend, or discontinue the service at any time without prior notice.'
              ]
            },
            {
              title: '3. Use of Data and Content',
              content: [
                '**Permitted Use:** You are encouraged to use the information, visualizations, and datasets available on this site for personal, educational, journalistic, or research purposes, provided you credit "KSAR DATA" as the source.',
                '**Prohibited Use:** You may not use the data for illegal purposes, to create misleading content, or for commercial purposes without explicit permission.',
                '**No Warranty of Accuracy:** The data presented is the result of an extraction and processing workflow from official documents. While we strive for the highest possible accuracy, **we do not guarantee that the information is error-free, complete, or up-to-date**. Unintentional errors or update delays may exist.',
                '**Important Disclaimer:** Information provided on this site should **never** be used for making legal, financial, commercial, or medical decisions. It is not a substitute for official documents or professional advice. For any official use, please consult the original primary sources or seek qualified expert advice.'
              ]
            },
            {
                title: '4. Intellectual Property',
                content: [
                    '**Site Content:** The design, text, graphics, and overall look and feel of the site are the property of the KSAR DATA initiative and are protected by copyright.',
                    '**Data:** The original raw data belongs to the public domain or the government entities that published it. The cleaned and structured datasets we produce are, where possible, made available under a Creative Commons Attribution 4.0 license.',
                    '**Source Code:** KSAR DATA is an open-source project. The code is available and governed by the terms of the MIT license or similar.',
                    '**Trademarks:** The "KSAR DATA" name and any associated logos are protected intellectual property.'
                ]
            },
            {
              title: '5. User Conduct',
              content: [
                'By using this site, you agree not to:',
                '• Use the service for any illegal or unauthorized purposes',
                '• Attempt to disrupt the functioning of the site or damage its systems (e.g., through denial-of-service attacks or malware)',
                '• Misrepresent the nature of the data or the initiative or publish misleading information in the name of KSAR DATA',
                '• Attempt unauthorized access to our systems or other users\' data',
                '• Violate the rights of others or applicable laws'
              ]
            },
            {
              title: '6. Disclaimers and Warranty Limitations',
              content: [
                'This site and the information contained herein are provided "as is" and "as available" without any express or implied warranties.',
                'We do not warrant that:',
                '• The site will operate uninterrupted or error-free',
                '• The information is accurate, current, or complete',
                '• The site is free from viruses or other harmful components',
                'You use the site at your own risk.'
              ]
            },
            {
              title: '7. Limitation of Liability',
              content: [
                'In no event shall the founders, contributors, or partners of KSAR DATA be liable for any direct, indirect, incidental, special, or consequential damages arising from:',
                '• The use of, or inability to use, the site or information',
                '• Your reliance on any information provided on the site',
                '• Any errors or omissions in the content',
                '• Any interruption or suspension of service',
                'Our maximum liability, if any, shall not exceed the amount you paid (if any) to access the service.'
              ]
            },
            {
              title: '8. Indemnification',
              content: [
                'You agree to indemnify, defend, and hold harmless KSAR DATA and its founders and contributors from any claims, damages, liabilities, losses, or costs arising from your use of the site or your violation of these terms.'
              ]
            },
            {
              title: '9. Service Suspension and Termination',
              content: [
                'We reserve the right to terminate or suspend your access to the site immediately and without prior notice for any reason, including violation of these terms.',
                'Upon termination, the provisions of these terms that by their nature apply after termination shall remain in effect.'
              ]
            },
            {
              title: '10. Governing Law and Dispute Resolution',
              content: [
                'These Terms of Use shall be governed and construed in accordance with the laws of Morocco, without regard to conflict of law provisions.',
                'Any dispute arising from or relating to these terms or use of the site shall first be resolved through amicable negotiations. If negotiations fail, the competent Moroccan courts shall have exclusive jurisdiction.'
              ]
            },
            {
              title: '11. General Provisions',
              content: [
                '**Severability:** If any provision of these terms is found to be unenforceable, the remaining provisions shall remain in effect.',
                '**Modifications:** We reserve the right to modify these terms at any time. Material changes will be announced on the site.',
                '**Waiver:** Our failure to enforce any provision does not constitute a waiver of our right to enforce it later.',
                '**Entire Agreement:** These terms constitute the entire agreement between us and you.'
              ]
            },
            {
              title: '12. Contact Us',
              content: [
                'For any questions regarding these terms or to report violations, please contact us at:',
                'Email: ksardata@gmail.com',
                'We will respond to your inquiry within 15 business days.'
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

export default TermsOfUsePage;