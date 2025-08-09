import { useState } from "react";
import { Download, FileText, Database, Users, Pill, Heart, Calendar, Vote, FileSpreadsheet } from "lucide-react";

const DownloadPage = ({ t, language = 'en', theme = 'light' }) => {
  const [downloading, setDownloading] = useState({});
  const [selectedFormat, setSelectedFormat] = useState({});

  // Text translations
  const texts = {
    ar: {
      title: 'تحميل البيانات',
      description: 'إيمانًا منّا بفلسفة البيانات المفتوحة وأهميتها في دعم البحث العلمي وتعزيز الشفافية، وحرصًا على تمكين الطلبة والباحثين والمهتمين من سهولة الوصول إلى البيانات المتعلقة بمدينة القصر الكبير، قمنا في مشروع KSAR-DATA بجمع ومعالجة وتنظيم هذه البيانات بعناية وفق منهجية دقيقة تضمن أعلى مستويات الجودة والمصداقية.وانطلاقًا من إيماننا بأن البيانات هي أساس التحليل العلمي وصنع القرار، فقد قمنا بإتاحة هذه البيانات بصيغ متعددة (JSON، CSV، Excel) لتناسب مختلف الاحتياجات التقنية والبحثية، مع ضمان سهولة تحميلها وإعادة استخدامها بحرية، بما يخدم الأغراض التعليمية والبحثية والتنموية. يمكنكم عبر هذه الصفحة تحميل النسخ المُحدّثة من البيانات التي تم عرضها على الموقع، والتي أُعدّت خصيصًا لتكون جاهزة للاستخدام المباشر، مساهمةً منّا في توفير مورد معرفي مفتوح يخدم مجتمعنا المحلي والمجتمع البحثي على حد سواء.',
      downloadAll: {
        json: 'تحميل الكل JSON',
        csv: 'تحميل الكل CSV',
        excel: 'تحميل الكل Excel'
      },
      downloading: 'جاري التحميل...',
      downloadJson: 'تحميل JSON',
      downloadCsv: 'تحميل CSV',
      downloadExcel: 'تحميل Excel',
      dataInfo: 'معلومات البيانات',
      fileFormats: 'تنسيقات الملفات',
      encoding: 'الترميز',
      usage: 'الاستخدام',
      jsonDesc: 'JSON - البيانات الخام',
      csvDesc: 'CSV - جداول البيانات',
      excelDesc: 'Excel - ملفات اكسل',
      encodingDesc: 'جميع الملفات بترميز UTF-8 لدعم النصوص العربية والإنجليزية والفرنسية',
      usageDesc: 'البيانات متاحة للاستخدام في الأبحاث والمشاريع التعليمية والتجارية',
      lastUpdated: 'آخر تحديث: يناير 2025 | البيانات مقدمة كما هي للاستخدام العام',
      downloadFailed: 'فشل في التحميل. يرجى المحاولة مرة أخرى.',
      datasets: {
        budget: { name: 'بيانات الميزانية', description: 'البيانات المالية والميزانية العامة' },
        rgph_part1: { name: 'بيانات الإحصاء السكاني - الجزء 1', description: 'البيانات الديموغرافية والسكانية - الجزء الأول' },
        rgph_part2: { name: 'بيانات الإحصاء السكاني - الجزء 2', description: 'البيانات الديموغرافية والسكانية - الجزء الثاني' },
        medicine: { name: 'أسعار الأدوية', description: 'بيانات أسعار الأدوية والمستحضرات الطبية' },
        support: { name: 'قائمة الدعم', description: 'بيانات المنح والدعم الحكومي' },
        attendance: { name: 'بيانات الحضور', description: 'بيانات حضور الجلسات والاجتماعات' },
        voting: { name: 'بيانات التصويت', description: 'بيانات التصويت والقرارات البرلمانية' }
      }
    },
    en: {
      title: 'Download Data',
      description: 'Believing in the philosophy of open data and its importance in supporting scientific research and promoting transparency, and committed to enabling students, researchers, and enthusiasts to easily access data related to the city of Ksar El Kebir, we at the KSAR-DATA project have carefully collected, processed, and organized this data following a rigorous methodology that ensures the highest levels of quality and reliability. Based on our conviction that data is the foundation for scientific analysis and informed decision-making, we have made this information available in multiple formats (JSON, CSV, Excel) to meet diverse technical and research needs, ensuring it is easy to download and freely reusable for educational, scientific, and developmental purposes. Through this page, you can download the latest updated versions of the data presented on the site, specially prepared to be ready for immediate use, contributing to the provision of an open knowledge resource that benefits both our local community and the research community at large.',
      downloadAll: {
        json: 'Download All JSON',
        csv: 'Download All CSV',
        excel: 'Download All Excel'
      },
      downloading: 'Downloading...',
      downloadJson: 'Download JSON',
      downloadCsv: 'Download CSV',
      downloadExcel: 'Download Excel',
      dataInfo: 'Data Information',
      fileFormats: 'File Formats',
      encoding: 'Encoding',
      usage: 'Usage',
      jsonDesc: 'JSON - Raw data',
      csvDesc: 'CSV - Spreadsheet data',
      excelDesc: 'Excel - Excel files',
      encodingDesc: 'All files use UTF-8 encoding for Arabic, English, and French text support',
      usageDesc: 'Data is available for use in research, educational, and commercial projects',
      lastUpdated: 'Last updated: January 2025 | Data provided as-is for public use',
      downloadFailed: 'Download failed. Please try again.',
      datasets: {
        budget: { name: 'Budget Data', description: 'Financial and budget data' },
        rgph_part1: { name: 'RGPH Data - Part 1', description: 'Demographic and population data - Part 1' },
        rgph_part2: { name: 'RGPH Data - Part 2', description: 'Demographic and population data - Part 2' },
        medicine: { name: 'Medicine Prices', description: 'Medicine and pharmaceutical prices data' },
        support: { name: 'Support Grants', description: 'Government grants and support data' },
        attendance: { name: 'Attendance Data', description: 'Session and meeting attendance data' },
        voting: { name: 'Voting Data', description: 'Parliamentary voting and decisions data' }
      }
    },
    fr: {
      title: 'Télécharger les Données',
      description: 'Croyant en la philosophie des données ouvertes et en son importance pour soutenir la recherche scientifique et promouvoir la transparence, et engagés à permettre aux étudiants, chercheurs et passionnés d\'accéder facilement aux données relatives à la ville de Ksar El Kebir, nous au projet KSAR-DATA avons soigneusement collecté, traité et organisé ces données en suivant une méthodologie rigoureuse qui garantit les plus hauts niveaux de qualité et de fiabilité. Basé sur notre conviction que les données sont le fondement de l\'analyse scientifique et de la prise de décision éclairée, nous avons rendu ces informations disponibles dans plusieurs formats (JSON, CSV, Excel) pour répondre aux divers besoins techniques et de recherche, en veillant à ce qu\'elles soient faciles à télécharger et librement réutilisables à des fins éducatives, scientifiques et de développement. Grâce à cette page, vous pouvez télécharger les dernières versions mises à jour des données présentées sur le site, spécialement préparées pour être prêtes à l\'usage immédiat, contribuant à fournir une ressource de connaissance ouverte qui profite à la fois à notre communauté locale et à la communauté de recherche au sens large.',
      downloadAll: {
        json: 'Télécharger Tout JSON',
        csv: 'Télécharger Tout CSV',
        excel: 'Télécharger Tout Excel'
      },
      downloading: 'Téléchargement...',
      downloadJson: 'Télécharger JSON',
      downloadCsv: 'Télécharger CSV',
      downloadExcel: 'Télécharger Excel',
      dataInfo: 'Informations sur les Données',
      fileFormats: 'Formats de Fichiers',
      encoding: 'Encodage',
      usage: 'Utilisation',
      jsonDesc: 'JSON - Données brutes',
      csvDesc: 'CSV - Données de feuille de calcul',
      excelDesc: 'Excel - Fichiers Excel',
      encodingDesc: 'Tous les fichiers utilisent l\'encodage UTF-8 pour le support des textes arabes, anglais et français',
      usageDesc: 'Les données sont disponibles pour une utilisation dans la recherche, les projets éducatifs et commerciaux',
      lastUpdated: 'Dernière mise à jour : Janvier 2025 | Données fournies en l\'état pour usage public',
      downloadFailed: 'Échec du téléchargement. Veuillez réessayer.',
      datasets: {
        budget: { name: 'Données Budgétaires', description: 'Données financières et budgétaires' },
        rgph_part1: { name: 'Données RGPH - Partie 1', description: 'Données démographiques et de population - Partie 1' },
        rgph_part2: { name: 'Données RGPH - Partie 2', description: 'Données démographiques et de population - Partie 2' },
        medicine: { name: 'Prix des Médicaments', description: 'Données des prix des médicaments et pharmaceutiques' },
        support: { name: 'Subventions de Soutien', description: 'Données des subventions et du soutien gouvernemental' },
        attendance: { name: 'Données de Présence', description: 'Données de présence aux sessions et réunions' },
        voting: { name: 'Données de Vote', description: 'Données de vote et décisions parlementaires' }
      }
    }
  };

  const currentText = texts[language] || texts.en;

  const dataFiles = [
    {
      id: 'budget',
      name: currentText.datasets.budget.name,
      description: currentText.datasets.budget.description,
      url: 'full_data_v6.json',
      url_csv: '/full_data_v6.csv',
      url_excel: '/full_data_v6.xlsx',
      icon: Database,
      size: '~3MB',
      records: '100K+ records'
    },
    {
      id: 'rgph_part1',
      name: currentText.datasets.rgph_part1.name,
      description: currentText.datasets.rgph_part1.description,
      url: '/part1_json.json',
      url_csv: '/part1_json.csv',
      url_excel: '/part1_json.xlsx',
      icon: Users,
      size: '~1MB',
      records: '50K+ records'
    },
    {
      id: 'rgph_part2',
      name: currentText.datasets.rgph_part2.name,
      description: currentText.datasets.rgph_part2.description,
      url: '/part2_json.json',
      url_csv: '/part2_json.csv',
      url_excel: '/part2_json.xlsx',
      icon: Users,
      size: '~1MB',
      records: '50K+ records'
    },
    {
      id: 'medicine',
      name: currentText.datasets.medicine.name,
      description: currentText.datasets.medicine.description,
      url: '/medicament_prices.json',
      url_csv: '/medicament_prices.csv',
      url_excel: '/medicament_prices.xlsx',
      icon: Pill,
      size: '~2.5MB',
      records: '10K+ records'
    },
    {
      id: 'support',
      name: currentText.datasets.support.name,
      description: currentText.datasets.support.description,
      url: '/support_list.json',
      url_csv: '/support_list.csv',
      url_excel: '/support_list.xlsx',
      icon: Heart,
      size: '~1MB',
      records: '5K+ records'
    },
    {
      id: 'attendance',
      name: currentText.datasets.attendance.name,
      description: currentText.datasets.attendance.description,
      url: '/attendence_all.json',
      url_csv: '/attendence_all.csv',
      url_excel: '/attendence_all.xlsx',
      icon: Calendar,
      size: '~500KB',
      records: '1K+ records'
    },
    {
      id: 'voting',
      name: currentText.datasets.voting.name,
      description: currentText.datasets.voting.description,
      url: '/voting_sort_2.json',
      url_csv: '/voting_sort_2.csv',
      url_excel: '/voting_sort_2.xlsx',
      icon: Vote,
      size: '~200KB',
      records: '15K+ records'
    }
  ];

  const handleDownload = async (file, format = 'json') => {
    const downloadKey = `${file.id}_${format}`;
    setDownloading(prev => ({ ...prev, [downloadKey]: true }));

    try {
      let urlToFetch;
      let filename;

      // Determine the correct URL and filename based on the selected format
      switch (format) {
        case 'csv':
          urlToFetch = file.url_csv;
          filename = `${file.id}_data.csv`;
          break;
        case 'excel':
          urlToFetch = file.url_excel;
          filename = `${file.id}_data.xlsx`;
          break;
        case 'json':
        default:
          urlToFetch = file.url;
          filename = `${file.id}_data.json`;
          break;
      }

      const response = await fetch(urlToFetch);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Get the file content directly as a blob, no conversion needed
      const blob = await response.blob();

      // Create a link to trigger the download
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
  
  const handleDownloadAll = async (format = 'json') => {
    setDownloading(prev => ({ ...prev, [`all_${format}`]: true }));
    
    try {
      // Download all files sequentially to avoid overwhelming the server
      for (const file of dataFiles) {
        await handleDownload(file, format);
        // Small delay between downloads
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    } catch (error) {
      console.error('Bulk download failed:', error);
    } finally {
      setDownloading(prev => ({ ...prev, [`all_${format}`]: false }));
    }
  };

  // Get font family and direction based on language
  const getFontAndDirection = () => {
    switch (language) {
      case 'ar':
        return { fontFamily: 'Noto Kufi Arabic, sans-serif', direction: 'rtl' };
      case 'fr':
        return { fontFamily: 'Inter, system-ui, sans-serif', direction: 'ltr' };
      default:
        return { fontFamily: 'Inter, sans-serif', direction: 'ltr' };
    }
  };

  return (
    <div style={getFontAndDirection()} className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'} transition-colors duration-200`}>
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
            theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
          }`}>
            <Download size={40} />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {currentText.title}
          </h1>
          <p className={`text-md md:text-xl text-justify max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            {currentText.description}
          </p>
        </div>

        {/* Download All Buttons */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => handleDownloadAll('json')}
              disabled={downloading.all_json}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {downloading.all_json ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentText.downloading}
                </>
              ) : (
                <>
                  <Download className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={18} />
                  {currentText.downloadAll.json}
                </>
              )}
            </button>
            
            <button
              onClick={() => handleDownloadAll('csv')}
              disabled={downloading.all_csv}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-green-600 hover:bg-green-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {downloading.all_csv ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentText.downloading}
                </>
              ) : (
                <>
                  <FileText className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={18} />
                  {currentText.downloadAll.csv}
                </>
              )}
            </button>
            
            <button
              onClick={() => handleDownloadAll('excel')}
              disabled={downloading.all_excel}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
                theme === 'dark'
                  ? 'bg-orange-600 hover:bg-orange-700 text-white'
                  : 'bg-orange-600 hover:bg-orange-700 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl transform hover:scale-105`}
            >
              {downloading.all_excel ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  {currentText.downloading}
                </>
              ) : (
                <>
                  <FileSpreadsheet className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={18} />
                  {currentText.downloadAll.excel}
                </>
              )}
            </button>
          </div>
        </div>

        {/* Data Files Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {dataFiles.map((file) => {
            const Icon = file.icon;
            const isDownloadingJSON = downloading[`${file.id}_json`];
            const isDownloadingCSV = downloading[`${file.id}_csv`];
            const isDownloadingExcel = downloading[`${file.id}_excel`];
            
            return (
              <div
                key={file.id}
                className={`rounded-xl p-6 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border border-gray-700'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <div className="flex items-center mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${language === 'ar' ? 'ml-4' : 'mr-4'} ${
                    theme === 'dark' ? 'bg-blue-900/20 text-blue-400' : 'bg-blue-100 text-blue-600'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold text-lg ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {file.name}
                    </h3>
                  </div>
                </div>

                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {file.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {file.size}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    theme === 'dark' ? 'bg-green-900/20 text-green-400' : 'bg-green-100 text-green-600'
                  }`}>
                    {file.records}
                  </span>
                </div>

                {/* Download Format Options */}
                <div className="space-y-2">
                  {/* JSON Download */}
                  <button
                    onClick={() => handleDownload(file, 'json')}
                    disabled={isDownloadingJSON}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm ${
                      theme === 'dark'
                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isDownloadingJSON ? (
                      <>
                        <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></div>
                        {currentText.downloading}
                      </>
                    ) : (
                      <>
                        <Database className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={14} />
                        {currentText.downloadJson}
                      </>
                    )}
                  </button>

                  {/* CSV Download */}
                  <button
                    onClick={() => handleDownload(file, 'csv')}
                    disabled={isDownloadingCSV}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm ${
                      theme === 'dark'
                        ? 'bg-green-600 hover:bg-green-700 text-white'
                        : 'bg-green-600 hover:bg-green-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isDownloadingCSV ? (
                      <>
                        <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></div>
                        {currentText.downloading}
                      </>
                    ) : (
                      <>
                        <FileText className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={14} />
                        {currentText.downloadCsv}
                      </>
                    )}
                  </button>

                  {/* Excel Download */}
                  <button
                    onClick={() => handleDownload(file, 'excel')}
                    disabled={isDownloadingExcel}
                    className={`w-full py-2 rounded-lg font-medium transition-all duration-200 flex items-center justify-center text-sm ${
                      theme === 'dark'
                        ? 'bg-orange-600 hover:bg-orange-700 text-white'
                        : 'bg-orange-600 hover:bg-orange-700 text-white'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isDownloadingExcel ? (
                      <>
                        <div className={`animate-spin rounded-full h-4 w-4 border-b-2 border-white ${language === 'ar' ? 'ml-2' : 'mr-2'}`}></div>
                        {currentText.downloading}
                      </>
                    ) : (
                      <>
                        <FileSpreadsheet className={`${language === 'ar' ? 'ml-2' : 'mr-2'}`} size={14} />
                        {currentText.downloadExcel}
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Section */}
        <div className={`mt-12 p-8 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
        } shadow-lg`}>
          <div className="flex items-center mb-4">
            <FileText className={`${language === 'ar' ? 'ml-3' : 'mr-3'} ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`} size={24} />
            <h2 className={`text-2xl font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {currentText.dataInfo}
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {currentText.fileFormats}
              </h3>
              <div className="space-y-2 text-sm">
                <div className={`flex items-center ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <Database size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-blue-500`} />
                  <span>{currentText.jsonDesc}</span>
                </div>
                <div className={`flex items-center ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <FileText size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-green-500`} />
                  <span>{currentText.csvDesc}</span>
                </div>
                <div className={`flex items-center ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  <FileSpreadsheet size={16} className={`${language === 'ar' ? 'ml-2' : 'mr-2'} text-orange-500`} />
                  <span>{currentText.excelDesc}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {currentText.encoding}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentText.encodingDesc}
              </p>
            </div>
            
            <div>
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {currentText.usage}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {currentText.usageDesc}
              </p>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-600">
            <p className={`text-xs ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
            }`}>
              {currentText.lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;