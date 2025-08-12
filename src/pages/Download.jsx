import { useState } from "react";
import { Download, FileText, Database, Users, Pill, Heart, Calendar, Vote, FileSpreadsheet, CheckCircle, Info, Code } from "lucide-react";

const DownloadPage = ({ language = 'en', theme = 'dark' }) => {
  const [downloading, setDownloading] = useState({});
  
  const texts = {
    ar: {
      // --- TEXT RESTORED ---
      title: 'تحميل البيانات',
      description: 'إيمانًا منّا بفلسفة البيانات المفتوحة وأهميتها في دعم البحث العلمي وتعزيز الشفافية، وحرصًا على تمكين الطلبة والباحثين والمهتمين من سهولة الوصول إلى البيانات المتعلقة بمدينة القصر الكبير، قمنا في مشروع KSAR-DATA بجمع ومعالجة وتنظيم هذه البيانات بعناية وفق منهجية دقيقة تضمن أعلى مستويات الجودة والمصداقية.وانطلاقًا من إيماننا بأن البيانات هي أساس التحليل العلمي وصنع القرار، فقد قمنا بإتاحة هذه البيانات بصيغ متعددة (JSON، CSV، Excel) لتناسب مختلف الاحتياجات التقنية والبحثية، مع ضمان سهولة تحميلها وإعادة استخدامها بحرية، بما يخدم الأغراض التعليمية والبحثية والتنموية. يمكنكم عبر هذه الصفحة تحميل النسخ المُحدّثة من البيانات التي تم عرضها على الموقع، والتي أُعدّت خصيصًا لتكون جاهزة للاستخدام المباشر، مساهمةً منّا في توفير مورد معرفي مفتوح يخدم مجتمعنا المحلي والمجتمع البحثي على حد سواء.',
      // --- END OF RESTORED TEXT ---
      downloadAllTitle: 'تنزيل شامل',
      downloadAllDesc: 'احصل على جميع مجموعات البيانات دفعة واحدة بالتنسيق الذي تفضله.',
      selectDataset: 'الرجاء تحديد مجموعة بيانات لعرض التفاصيل.',
      lastUpdated: 'آخر تحديث',
      fileSize: 'حجم الملف',
      records: 'السجلات',
      downloading: 'جاري التحميل...',
      download: 'تحميل',
      dataInfo: 'معلومات الترخيص والاستخدام',
      fileFormats: 'تنسيقات الملفات',
      encoding: 'الترميز',
      usage: 'الاستخدام',
      jsonDesc: 'بيانات خام مرنة للمطورين.',
      csvDesc: 'متوافق عالميًا مع جداول البيانات.',
      excelDesc: 'ملفات Excel أصلية مع التنسيق.',
      encodingDesc: 'جميع الملفات تستخدم ترميز UTF-8 لدعم النصوص متعددة اللغات.',
      usageDesc: 'البيانات مرخصة للاستخدام العام ويمكن استخدامها في المشاريع التعليمية والتجارية.',
      downloadFailed: 'فشل التحميل. يرجى المحاولة مرة أخرى.',
      datasets: {
        budget: { name: 'بيانات الميزانية', description: 'بيانات مالية وميزانية مفصلة من السنوات الأخيرة.' },
        rgph_part1: { name: 'بيانات الإحصاء - ج1', description: 'بيانات ديموغرافية وسكانية شاملة من RGPH.' },
        rgph_part2: { name: 'بيانات الإحصاء - ج2', description: 'مجموعات بيانات إضافية من RGPH تغطي ظروف السكن والتعليم.' },
        medicine: { name: 'أسعار الأدوية', description: 'قائمة أسعار الأدوية والمستحضرات الطبية المعتمدة.' },
        support: { name: 'قائمة الدعم', description: 'بيانات حول المستفيدين من المنح والدعم الحكومي.' },
        attendance: { name: 'بيانات الحضور', description: 'سجلات حضور الجلسات والاجتماعات الرسمية.' },
        voting: { name: 'بيانات التصويت', description: 'نتائج التصويت والقرارات البرلمانية.' }
      }
    },
    en: {
      // --- TEXT RESTORED ---
      title: 'Download Data',
      description: 'Believing in the philosophy of open data and its importance in supporting scientific research and promoting transparency, and committed to enabling students, researchers, and enthusiasts to easily access data related to the city of Ksar El Kebir, we at the KSAR-DATA project have carefully collected, processed, and organized this data following a rigorous methodology that ensures the highest levels of quality and reliability. Based on our conviction that data is the foundation for scientific analysis and informed decision-making, we have made this information available in multiple formats (JSON, CSV, Excel) to meet diverse technical and research needs, ensuring it is easy to download and freely reusable for educational, scientific, and developmental purposes. Through this page, you can download the latest updated versions of the data presented on the site, specially prepared to be ready for immediate use, contributing to the provision of an open knowledge resource that benefits both our local community and the research community at large.',
      // --- END OF RESTORED TEXT ---
      downloadAllTitle: 'Bulk Download',
      downloadAllDesc: 'Get all datasets at once in your preferred format.',
      selectDataset: 'Please select a dataset to view details.',
      lastUpdated: 'Last Updated',
      fileSize: 'File Size',
      records: 'Records',
      downloading: 'Downloading...',
      download: 'Download',
      dataInfo: 'License & Usage Information',
      fileFormats: 'File Formats',
      encoding: 'Encoding',
      usage: 'Usage',
      jsonDesc: 'Flexible raw data for developers.',
      csvDesc: 'Universally compatible spreadsheet data.',
      excelDesc: 'Native Excel files with formatting.',
      encodingDesc: 'All files use UTF-8 encoding to support multilingual text.',
      usageDesc: 'Data is licensed for public use and can be used in educational and commercial projects.',
      downloadFailed: 'Download failed. Please try again.',
      datasets: {
        budget: { name: 'Budget Data', description: 'Detailed financial and budget data from recent years.' },
        rgph_part1: { name: 'Census Data - P1', description: 'Comprehensive demographic and population data from the RGPH.' },
        rgph_part2: { name: 'Census Data - P2', description: 'Additional RGPH datasets covering housing and education.' },
        medicine: { name: 'Medicine Prices', description: 'Official price list for medicines and pharmaceuticals.' },
        support: { name: 'Support Grants', description: 'Data on recipients of government grants and support.' },
        attendance: { name: 'Attendance Data', description: 'Attendance records for official sessions and meetings.' },
        voting: { name: 'Voting Data', description: 'Results of parliamentary votes and decisions.' }
      }
    },
    fr: {
      // --- TEXT RESTORED ---
      title: 'Télécharger les Données',
      description: 'Croyant en la philosophie des données ouvertes et en son importance pour soutenir la recherche scientifique et promouvoir la transparence, et engagés à permettre aux étudiants, chercheurs et passionnés d\'accéder facilement aux données relatives à la ville de Ksar El Kebir, nous au projet KSAR-DATA avons soigneusement collecté, traité et organisé ces données en suivant une méthodologie rigoureuse qui garantit les plus hauts niveaux de qualité et de fiabilité. Basé sur notre conviction que les données sont le fondement de l\'analyse scientifique et de la prise de décision éclairée, nous avons rendu ces informations disponibles dans plusieurs formats (JSON, CSV, Excel) pour répondre aux divers besoins techniques et de recherche, en veillant à ce qu\'elles soient faciles à télécharger et librement réutilisables à des fins éducatives, scientifiques et de développement. Grâce à cette page, vous pouvez télécharger les dernières versions mises à jour des données présentées sur le site, spécialement préparées pour être prêtes à l\'usage immédiat, contribuant à fournir une ressource de connaissance ouverte qui profite à la fois à notre communauté locale et à la communauté de recherche au sens large.',
      // --- END OF RESTORED TEXT ---
      downloadAllTitle: 'Téléchargement groupé',
      downloadAllDesc: 'Obtenez tous les ensembles de données en une seule fois dans votre format préféré.',
      selectDataset: 'Veuillez sélectionner un jeu de données pour voir les détails.',
      lastUpdated: 'Dernière mise à jour',
      fileSize: 'Taille du fichier',
      records: 'Enregistrements',
      downloading: 'Téléchargement...',
      download: 'Télécharger',
      dataInfo: 'Informations de Licence et d\'Utilisation',
      fileFormats: 'Formats de Fichiers',
      encoding: 'Encodage',
      usage: 'Utilisation',
      jsonDesc: 'Données brutes flexibles pour les développeurs.',
      csvDesc: 'Données de tableur universellement compatibles.',
      excelDesc: 'Fichiers Excel natifs avec mise en forme.',
      encodingDesc: 'Tous les fichiers utilisent l\'encodage UTF-8 pour le texte multilingue.',
      usageDesc: 'Les données sont sous licence pour un usage public et peuvent être utilisées dans des projets.',
      downloadFailed: 'Échec du téléchargement. Veuillez réessayer.',
      datasets: {
        budget: { name: 'Données Budgétaires', description: 'Données financières et budgétaires détaillées des dernières années.' },
        rgph_part1: { name: 'Données Recensement - P1', description: 'Données démographiques et de population complètes du RGPH.' },
        rgph_part2: { name: 'Données Recensement - P2', description: 'Données RGPH supplémentaires sur le logement et l\'éducation.' },
        medicine: { name: 'Prix des Médicaments', description: 'Liste de prix officielle des médicaments et produits pharmaceutiques.' },
        support: { name: 'Subventions de Soutien', description: 'Données sur les bénéficiaires de subventions gouvernementales.' },
        attendance: { name: 'Données de Présence', description: 'Registres de présence aux sessions et réunions officielles.' },
        voting: { name: 'Données de Vote', description: 'Résultats des votes et décisions parlementaires.' }
      }
    }
  };

  const currentText = texts[language] || texts.en;

  const dataFiles = [
    { id: 'budget', url: '/full_data_v6.json', url_csv: '/full_data_v6.csv', url_excel: '/full_data_v6.xlsx', icon: Database, color: 'blue', size: '~3MB', records: '100K+', updated: 'Jan 2025' },
    { id: 'rgph_part1', url: '/part1_json.json', url_csv: '/part1_json.csv', url_excel: '/part1_json.xlsx', icon: Users, color: 'teal', size: '~1MB', records: '50K+', updated: 'Jan 2025' },
    { id: 'rgph_part2', url: '/part2_json.json', url_csv: '/part2_json.csv', url_excel: '/part2_json.xlsx', icon: Users, color: 'teal', size: '~1MB', records: '50K+', updated: 'Jan 2025' },
    { id: 'medicine', url: '/medicament_prices.json', url_csv: '/medicament_prices.csv', url_excel: '/medicament_prices.xlsx', icon: Pill, color: 'green', size: '~2.5MB', records: '10K+', updated: 'Dec 2024' },
    { id: 'support', url: '/support_list.json', url_csv: '/support_list.csv', url_excel: '/support_list.xlsx', icon: Heart, color: 'purple', size: '~1MB', records: '5K+', updated: 'Dec 2024' },
    { id: 'attendance', url: '/attendence_all.json', url_csv: '/attendence_all.csv', url_excel: '/attendence_all.xlsx', icon: Calendar, color: 'orange', size: '~500KB', records: '1K+', updated: 'Nov 2024' },
    { id: 'voting', url: '/voting_sort_2.json', url_csv: '/voting_sort_2.csv', url_excel: '/voting_sort_2.xlsx', icon: Vote, color: 'blue', size: '~200KB', records: '15K+', updated: 'Nov 2024' }
  ].map(file => ({ ...file, name: currentText.datasets[file.id].name, description: currentText.datasets[file.id].description }));
  
  const [activeDataset, setActiveDataset] = useState(dataFiles[0]);
  const [selectedFormat, setSelectedFormat] = useState('json');

  const handleDownload = async (file, format) => {
    const downloadKey = `${file.id}_${format}`;
    setDownloading(prev => ({ ...prev, [downloadKey]: true }));
    try {
      const urlMap = { json: file.url, csv: file.url_csv, excel: file.url_excel };
      const urlToFetch = urlMap[format];
      const filename = `${file.id}_data.${format === 'excel' ? 'xlsx' : format}`;
      const response = await fetch(urlToFetch);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
      alert(currentText.downloadFailed);
    } finally {
      setDownloading(prev => ({ ...prev, [downloadKey]: false }));
    }
  };

  const handleBulkDownload = async (format) => {
    setDownloading({ [`all_${format}`]: true });
    for (const file of dataFiles) {
      await handleDownload(file, format);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    setDownloading({});
  };

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    sectionBg: theme === 'dark' ? 'bg-black/20' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    accents: {
      blue: 'text-blue-400',
      teal: 'text-teal-400',
      green: 'text-green-400',
      purple: 'text-purple-400',
      orange: 'text-orange-400',
    },
    bgAccents: {
      blue: theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100',
      teal: theme === 'dark' ? 'bg-teal-500/20' : 'bg-teal-100',
      green: theme === 'dark' ? 'bg-green-500/20' : 'bg-green-100',
      purple: theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-100',
      orange: theme === 'dark' ? 'bg-orange-500/20' : 'bg-orange-100',
    }
  };

  const formatButtons = [
    { format: 'json', icon: Database, color: 'blue' },
    { format: 'csv', icon: FileText, color: 'green' },
    { format: 'excel', icon: FileSpreadsheet, color: 'orange' }
  ];

  return (
    <div style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : {}} className={`min-h-screen ${themeClasses.bg}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4 py-12">
        {/* HEADER */}
        <header className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${themeClasses.textPrimary}`}>{currentText.title}</h1>
          <p className={`max-w-3xl mx-auto text-lg leading-relaxed ${themeClasses.textSecondary}`}>{currentText.description}</p>
        </header>

        {/* REPOSITORY LAYOUT */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT PANEL: DATASET LIST */}
          <aside className="lg:col-span-1 space-y-4">
            <div className={`p-6 rounded-xl border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
              <h2 className={`text-xl font-bold mb-4 ${themeClasses.textPrimary}`}>{currentText.downloadAllTitle}</h2>
              <p className={`text-sm mb-4 ${themeClasses.textSecondary}`}>{currentText.downloadAllDesc}</p>
              <div className="flex justify-around">
                {formatButtons.map(btn => (
                   <button key={btn.format} onClick={() => handleBulkDownload(btn.format)} disabled={downloading[`all_${btn.format}`]} className={`p-3 rounded-full text-white bg-${btn.color}-600 hover:bg-${btn.color}-700 transition transform hover:scale-110 disabled:opacity-50`}>
                     {downloading[`all_${btn.format}`] ? <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div> : <btn.icon size={20} />}
                   </button>
                ))}
              </div>
            </div>
            
            <div className={`p-2 rounded-xl border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
              <div className="space-y-1">
                {dataFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => { setActiveDataset(file); setSelectedFormat('json'); }}
                    className={`w-full flex items-center text-left p-3 rounded-lg transition-colors ${activeDataset.id === file.id ? 'bg-blue-600/20' : 'hover:bg-gray-500/10'}`}
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-md flex items-center justify-center ${themeClasses.bgAccents[file.color]}`}>
                        <file.icon size={18} className={`${themeClasses.accents[file.color]}`} />
                    </div>
                    <span className={`flex-1 font-semibold ${language === 'ar' ? 'mr-3' : 'ml-3'} ${themeClasses.textPrimary}`}>
                      {file.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* RIGHT PANEL: DETAIL VIEW */}
          <div className="lg:col-span-2">
            <div className={`sticky top-8 p-8 rounded-2xl border-2 ${themeClasses.borderColor} ${themeClasses.sectionBg}`}>
              {!activeDataset ? (
                <div className="flex flex-col items-center justify-center h-96 text-center">
                  <Database size={48} className={themeClasses.textSecondary} />
                  <p className={`mt-4 text-xl ${themeClasses.textSecondary}`}>{currentText.selectDataset}</p>
                </div>
              ) : (
                <div>
                  {/* Header */}
                  <h2 className={`text-3xl font-bold mb-3 ${themeClasses.textPrimary}`}>{activeDataset.name}</h2>
                  <p className={`text-lg leading-relaxed mb-6 ${themeClasses.textSecondary}`}>{activeDataset.description}</p>
                  
                  {/* Metadata */}
                  <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 mb-8 p-4 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
                      <div className="text-center">
                          <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{currentText.lastUpdated}</p>
                          <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{activeDataset.updated}</p>
                      </div>
                      <div className="text-center">
                          <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{currentText.fileSize}</p>
                          <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{activeDataset.size}</p>
                      </div>
                      <div className="text-center col-span-2 md:col-span-1">
                          <p className={`text-sm font-medium ${themeClasses.textSecondary}`}>{currentText.records}</p>
                          <p className={`text-lg font-semibold ${themeClasses.textPrimary}`}>{activeDataset.records}</p>
                      </div>
                  </div>

                  {/* Download Controls */}
                  <div className="space-y-4">
                    <div className={`flex items-center p-1 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
                       {formatButtons.map(({format, icon: Icon, color}) => (
                           <button key={format} onClick={() => setSelectedFormat(format)} className={`flex-1 flex items-center justify-center p-2 rounded-md transition-colors text-sm font-semibold ${selectedFormat === format ? `text-white bg-${color}-600` : `${themeClasses.textSecondary} hover:bg-gray-500/10`}`}>
                               <Icon size={16} className="mr-2"/> {format.toUpperCase()}
                           </button>
                       ))}
                    </div>
                    
                    <button onClick={() => handleDownload(activeDataset, selectedFormat)} disabled={downloading[`${activeDataset.id}_${selectedFormat}`]} className={`w-full py-3 rounded-lg font-bold text-lg text-white bg-green-600 hover:bg-green-700 transition transform hover:scale-105 disabled:opacity-50`}>
                      {downloading[`${activeDataset.id}_${selectedFormat}`] ? (
                        <div className="flex items-center justify-center">
                           <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                           {currentText.downloading}
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                           <Download size={20} className="mr-2"/>
                           {currentText.download} {selectedFormat.toUpperCase()}
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* INFO SECTION */}
        <footer className="mt-16">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${themeClasses.textPrimary}`}>{currentText.dataInfo}</h2>
          </div>
           <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
                    <div className="flex items-center mb-3">
                        <FileText size={20} className={themeClasses.textAccent}/>
                        <h3 className={`font-semibold text-lg ml-2 ${themeClasses.textPrimary}`}>{currentText.fileFormats}</h3>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{currentText.jsonDesc}<br/>{currentText.csvDesc}<br/>{currentText.excelDesc}</p>
                </div>
                <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
                    <div className="flex items-center mb-3">
                        <Code size={20} className={themeClasses.textAccent}/>
                        <h3 className={`font-semibold text-lg ml-2 ${themeClasses.textPrimary}`}>{currentText.encoding}</h3>
                    </div>
                     <p className={`text-sm ${themeClasses.textSecondary}`}>{currentText.encodingDesc}</p>
                </div>
                <div className={`p-6 rounded-lg border ${themeClasses.borderColor} ${themeClasses.cardBg}`}>
                     <div className="flex items-center mb-3">
                        <CheckCircle size={20} className={themeClasses.textAccent}/>
                        <h3 className={`font-semibold text-lg ml-2 ${themeClasses.textPrimary}`}>{currentText.usage}</h3>
                    </div>
                    <p className={`text-sm ${themeClasses.textSecondary}`}>{currentText.usageDesc}</p>
                </div>
            </div>
        </footer>
      </div>
    </div>
  );
};

export default DownloadPage;