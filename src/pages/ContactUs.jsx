import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Send,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  User,
  MapPin,
  Clock
} from 'lucide-react';

const ContactUsPage = ({ 
  language = 'ar', 
  theme = 'dark' 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    message: ''
  });

  
  

  // Translations
  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          heroTitle: 'تواصل معنا',
          heroSubtitle: 'نحن هنا للاستماع إليك. راسلنا أو تواصل معنا عبر وسائل التواصل الاجتماعي',
          formTitle: 'أرسل لنا رسالة',
          formSubtitle: 'سواء كان لديك اقتراح، سؤال، أو تريد التعاون معنا',
          namePlaceholder: 'اسمك الكامل',
          contactPlaceholder: 'بريدك الإلكتروني أو رقم هاتفك',
          messagePlaceholder: 'رسالتك...',
          sendButton: 'إرسال الرسالة',
          socialTitle: 'تابعنا على وسائل التواصل',
          socialSubtitle: 'تواصل معنا مباشرة عبر منصاتنا الاجتماعية',
          contactInfo: {
            title: 'معلومات التواصل',
            email: 'البريد الإلكتروني',
            location: 'الموقع',
            locationValue: 'القصر الكبير، المغرب',
            hours: 'ساعات الاستجابة',
            hoursValue: '24-48 ساعة'
          },
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
            { name: 'X', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: '#', color: 'hover:text-green-500' }
          ]
        };

      case 'en':
        return {
          heroTitle: 'Contact Us',
          heroSubtitle: 'We\'re here to listen. Send us a message or reach out via social media',
          formTitle: 'Send Us a Message',
          formSubtitle: 'Whether you have a suggestion, question, or want to collaborate with us',
          namePlaceholder: 'Your full name',
          contactPlaceholder: 'Your email or phone number',
          messagePlaceholder: 'Your message...',
          sendButton: 'Send Message',
          socialTitle: 'Follow Us on Social Media',
          socialSubtitle: 'Connect with us directly through our social platforms',
          contactInfo: {
            title: 'Contact Information',
            email: 'Email',
            location: 'Location',
            locationValue: 'Ksar El Kebir, Morocco',
            hours: 'Response Time',
            hoursValue: '24-48 hours'
          },
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
            { name: 'Twitter/X', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: '#', color: 'hover:text-green-500' }
          ]
        };

      default: // French
        return {
          heroTitle: 'Contactez-Nous',
          heroSubtitle: 'Nous sommes là pour vous écouter. Envoyez-nous un message ou contactez-nous via les réseaux sociaux',
          formTitle: 'Envoyez-nous un Message',
          formSubtitle: 'Que vous ayez une suggestion, une question, ou que vous souhaitiez collaborer avec nous',
          namePlaceholder: 'Votre nom complet',
          contactPlaceholder: 'Votre email ou numéro de téléphone',
          messagePlaceholder: 'Votre message...',
          sendButton: 'Envoyer le Message',
          socialTitle: 'Suivez-nous sur les Réseaux Sociaux',
          socialSubtitle: 'Connectez-vous avec nous directement via nos plateformes sociales',
          contactInfo: {
            title: 'Informations de Contact',
            email: 'Email',
            location: 'Localisation',
            locationValue: 'Ksar El Kebir, Maroc',
            hours: 'Temps de Réponse',
            hoursValue: '24-48 heures'
          },
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: '#', color: 'hover:text-blue-600' },
            { name: 'Twitter/X', icon: Twitter, url: '#', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: '#', color: 'hover:text-green-500' }
          ]
        };
    }
  };

  const t = getTranslations();

  // Theme classes
  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    iconBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100',
    inputBg: theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50',
    inputBorder: theme === 'dark' ? 'border-gray-700' : 'border-gray-300',
    inputFocus: theme === 'dark' ? 'focus:border-blue-500 focus:ring-blue-500' : 'focus:border-blue-500 focus:ring-blue-500',
    gradientFrom: theme === 'dark' ? 'from-blue-600' : 'from-blue-500',
    gradientTo: theme === 'dark' ? 'to-purple-600' : 'to-purple-500',
    buttonBg: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create email body
    const emailBody = `
الاسم: ${formData.name}
معلومات التواصل: ${formData.contact}

الرسالة:
${formData.message}
    `;
    
    // Create mailto link
    const mailtoLink = `mailto:bt.younesse@gmail.com?subject=رسالة من موقع KSAR-DATA&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({
      name: '',
      contact: '',
      message: ''
    });
  };

  return (
    <div 
      className={`min-h-screen ${themeClasses.bg} pt-10`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${themeClasses.gradientFrom} ${themeClasses.gradientTo} opacity-1`}></div>
        <div className="container mx-auto px-6 lg:px-12 py-16 relative">
          <div className="text-center max-w-4xl mx-auto">
            <img 
              src={`${theme === 'dark' ? '/logo_on_dark.png' : '/Logo_on_white.png'}`} 
              alt="Ksar El Kebir Gate"
              className="w-50 justify-self-center mb-5 max-w-2xl h-auto object-contain drop-shadow-2xl"
            />
            <h1 className={`text-4xl lg:text-6xl font-bold mb-6 ${themeClasses.textPrimary}`}>
              {t.heroTitle}
            </h1>
            <p className={`text-xl lg:text-2xl mb-8 ${themeClasses.textSecondary} leading-relaxed`}>
              {t.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-12">
            

            {/* Contact Info & Social Media */}
            <div className="space-y-8 ">
              
              {/* Contact Information */}
              <div className={`rounded-lg border shadow-lg p-8 ${themeClasses.cardBg} ${themeClasses.borderColor}`}>
                <h3 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
                  {t.contactInfo.title}
                </h3>
                
                <div className="space-y-6">
                  {/* Email */}
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${themeClasses.iconBg} ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                      <Mail className={`w-5 h-5 ${themeClasses.textAccent}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{t.contactInfo.email}</p>
                      <a 
                        href="mailto:bt.younesse@gmail.com"
                        className={`${themeClasses.textAccent} hover:underline`}
                      >
                        bt.younesse@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${themeClasses.iconBg} ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                      <MapPin className={`w-5 h-5 ${themeClasses.textAccent}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{t.contactInfo.location}</p>
                      <p className={`${themeClasses.textSecondary}`}>{t.contactInfo.locationValue}</p>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-center">
                    <div className={`p-3 rounded-lg ${themeClasses.iconBg} ${language === 'ar' ? 'ml-4' : 'mr-4'}`}>
                      <Clock className={`w-5 h-5 ${themeClasses.textAccent}`} />
                    </div>
                    <div>
                      <p className={`font-medium ${themeClasses.textPrimary}`}>{t.contactInfo.hours}</p>
                      <p className={`${themeClasses.textSecondary}`}>{t.contactInfo.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className={`rounded-lg border shadow-lg p-8 ${themeClasses.cardBg} ${themeClasses.borderColor}`}>
                <h3 className={`text-2xl font-bold mb-4 ${themeClasses.textPrimary}`}>
                  {t.socialTitle}
                </h3>
                <p className={`text-lg mb-6 ${themeClasses.textSecondary}`}>
                  {t.socialSubtitle}
                </p>
                
                <div className="grid grid-cols-2 gap-4">
                  {t.socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className={`flex items-center p-4 rounded-lg border ${themeClasses.iconBg} ${themeClasses.borderColor} ${social.color} transition-colors group`}
                    >
                      <social.icon className={`w-6 h-6 ${themeClasses.textSecondary} group-hover:text-current ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                      <span className={`font-medium ${themeClasses.textPrimary}`}>{social.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* FOOTER CTA */}
      <section className={`py-16 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="text-center">
            <div className={`inline-flex items-center px-6 py-3 rounded-full border ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-3"></div>
              <span className={themeClasses.textSecondary}>
                {language === 'ar' ? 'نسخة تجريبية – الإصدار 1.1.7 | جميع الحقوق محفوظة © 2025' : 
                 language === 'en' ? 'Beta Version – v1.1.7 | All Rights Reserved © 2025' : 
                 'Version d’essai – v1.1.7 | Tous droits réservés © 2025'}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUsPage;