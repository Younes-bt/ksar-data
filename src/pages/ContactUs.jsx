import React, { useState } from 'react';
import {
  Mail,
  Send,
  Facebook,
  Twitter,
  Linkedin,
  MessageSquare,
  User,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';

const ContactUsPage = ({
  language = 'en',
  theme = 'dark'
}) => {
  // --- START OF CHANGES ---

  // 1. Replace with your actual Web3Forms Access Key
  const [accessKey, setAccessKey] = useState('ebee2453-d9f1-4357-8bce-785556588020');

  const [formData, setFormData] = useState({
    name: '',
    contact: '', // Changed from 'email' to 'contact' to be more generic
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success', 'error', or null

  // --- END OF CHANGES ---

  const getTranslations = () => {
    switch (language) {
      case 'ar':
        return {
          heroTitle: 'تواصل معنا',
          heroSubtitle: 'نحن هنا للاستماع إليك. املأ النموذج أو تواصل معنا مباشرة.',
          formTitle: 'أرسل لنا رسالة',
          namePlaceholder: 'اسمك الكامل',
          contactPlaceholder: 'بريدك الإلكتروني أو رقم هاتفك',
          messagePlaceholder: 'رسالتك...',
          sendButton: 'إرسال الرسالة',
          submittingButton: 'جاري الإرسال...',
          successMessage: 'تم إرسال رسالتك بنجاح! شكراً لتواصلك معنا.',
          errorMessage: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
          contactInfoTitle: 'معلومات التواصل',
          email: 'البريد الإلكتروني',
          location: 'الموقع',
          locationValue: 'القصر الكبير، المغرب',
          hours: 'ساعات الاستجابة',
          hoursValue: '24-48 ساعة',
          socialTitle: 'تابعنا',
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61578979396224', color: 'hover:text-blue-600' },
            { name: 'X', icon: Twitter, url: 'https://x.com/OpicomTech', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/unesbt42/', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: 'https://wa.me/+212723208407?text=مرحيا!!', color: 'hover:text-green-500' }
          ]
        };
      case 'en':
        return {
          heroTitle: 'Get in Touch',
          heroSubtitle: 'We\'re here to listen. Fill out the form or contact us directly.',
          formTitle: 'Send a Message',
          namePlaceholder: 'Your full name',
          contactPlaceholder: 'Your email or phone number',
          messagePlaceholder: 'Your message...',
          sendButton: 'Send Message',
          submittingButton: 'Submitting...',
          successMessage: 'Your message was sent successfully! Thank you for reaching out.',
          errorMessage: 'Something went wrong. Please try again.',
          contactInfoTitle: 'Contact Information',
          email: 'Email',
          location: 'Location',
          locationValue: 'Ksar El Kebir, Morocco',
          hours: 'Response Time',
          hoursValue: '24-48 hours',
          socialTitle: 'Follow Us',
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61578979396224', color: 'hover:text-blue-600' },
            { name: 'X', icon: Twitter, url: 'https://x.com/OpicomTech', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/unesbt42/', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: 'https://wa.me/+212723208407?text=مرحيا!!', color: 'hover:text-green-500' }
          ]
        };
      default: // French
        return {
          heroTitle: 'Contactez-Nous',
          heroSubtitle: 'Nous sommes là pour vous écouter. Remplissez le formulaire ou contactez-nous directement.',
          formTitle: 'Envoyer un Message',
          namePlaceholder: 'Votre nom complet',
          contactPlaceholder: 'Votre email ou numéro de téléphone',
          messagePlaceholder: 'Votre message...',
          sendButton: 'Envoyer le Message',
          submittingButton: 'Envoi en cours...',
          successMessage: 'Votre message a été envoyé avec succès ! Merci de nous avoir contactés.',
          errorMessage: 'Une erreur s\'est produite. Veuillez réessayer.',
          contactInfoTitle: 'Informations de Contact',
          email: 'Email',
          location: 'Localisation',
          locationValue: 'Ksar El Kebir, Maroc',
          hours: 'Temps de Réponse',
          hoursValue: '24-48 heures',
          socialTitle: 'Suivez-nous',
          socialLinks: [
            { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/profile.php?id=61578979396224', color: 'hover:text-blue-600' },
            { name: 'X', icon: Twitter, url: 'https://x.com/OpicomTech', color: 'hover:text-sky-500' },
            { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/unesbt42/', color: 'hover:text-blue-700' },
            { name: 'WhatsApp', icon: MessageSquare, url: 'https://wa.me/+212723208407?text=مرحيا!!', color: 'hover:text-green-500' }
          ]
        };
    }
  };

  const t = getTranslations();

  const themeClasses = {
    bg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50',
    cardBg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
    infoPanelBg: theme === 'dark' ? 'bg-gray-950' : 'bg-gray-100',
    borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
    textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
    textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
    textAccent: theme === 'dark' ? 'text-blue-400' : 'text-blue-600',
    inputBg: theme === 'dark' ? 'bg-gray-800' : 'bg-white',
    inputBorder: theme === 'dark' ? 'border-gray-700' : 'border-gray-300',
    inputFocus: theme === 'dark' ? 'focus:border-blue-500 focus:ring-blue-500' : 'focus:border-blue-500 focus:ring-blue-500',
    buttonBg: theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // --- START OF CHANGES ---

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('submitting');

    const data = {
      ...formData,
      access_key: accessKey,
      subject: `New Message from ${formData.name} via KSAR DATA`,
    };

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (result.success) {
        setSubmissionStatus('success');
        setFormData({ name: '', contact: '', message: '' }); // Clear form
        setTimeout(() => setSubmissionStatus(null), 5000); // Hide message after 5s
      } else {
        console.error('Submission Error:', result);
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Network Error:', error);
      setSubmissionStatus('error');
    }
  };

  // --- END OF CHANGES ---

  return (
    <div
      className={`min-h-screen ${themeClasses.bg} py-12 md:py-20`}
      dir={language === 'ar' ? 'rtl' : 'ltr'}
      style={language === 'ar' ? { fontFamily: 'Noto Kufi Arabic, sans-serif' } : undefined}
    >
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${themeClasses.textPrimary}`}>
            {t.heroTitle}
          </h1>
          <p className={`text-lg lg:text-xl ${themeClasses.textSecondary}`}>
            {t.heroSubtitle}
          </p>
        </div>

        <div className={`max-w-6xl mx-auto rounded-2xl border ${themeClasses.borderColor} shadow-2xl overflow-hidden flex flex-col lg:flex-row`}>
          <div className={`w-full lg:w-3/5 p-8 md:p-12 ${themeClasses.cardBg}`}>
            <h2 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
              {t.formTitle}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <User className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${themeClasses.textSecondary} ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder={t.namePlaceholder}
                  className={`w-full p-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} rounded-lg ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.textPrimary} ${themeClasses.inputFocus} transition-colors`}
                  required
                />
              </div>

              <div className="relative">
                <Mail className={`absolute top-1/2 -translate-y-1/2 w-5 h-5 ${themeClasses.textSecondary} ${language === 'ar' ? 'right-4' : 'left-4'}`} />
                <input
                  type="text"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder={t.contactPlaceholder}
                  className={`w-full p-3 ${language === 'ar' ? 'pr-12' : 'pl-12'} rounded-lg ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.textPrimary} ${themeClasses.inputFocus} transition-colors`}
                  required
                />
              </div>

              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder={t.messagePlaceholder}
                rows="6"
                className={`w-full p-4 rounded-lg ${themeClasses.inputBg} border ${themeClasses.inputBorder} ${themeClasses.textPrimary} ${themeClasses.inputFocus} transition-colors`}
                required
              ></textarea>

              {/* --- DYNAMIC SUBMISSION STATUS --- */}
              <div>
                <button
                  type="submit"
                  disabled={submissionStatus === 'submitting'}
                  className={`w-full flex items-center justify-center p-4 rounded-lg text-white font-bold text-lg ${themeClasses.buttonBg} transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed transform hover:scale-105`}
                >
                  {submissionStatus === 'submitting' ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span className={`${language === 'ar' ? 'mr-3' : 'ml-3'}`}>{t.submittingButton}</span>
                    </>
                  ) : (
                    <>
                      <span>{t.sendButton}</span>
                      <Send className={`w-5 h-5 ${language === 'ar' ? 'mr-3' : 'ml-3'}`} />
                    </>
                  )}
                </button>

                {submissionStatus === 'success' && (
                  <div className="mt-4 flex items-center text-green-500 bg-green-500/10 p-3 rounded-lg">
                    <CheckCircle className="w-5 h-5" />
                    <p className={`text-sm font-medium ${language === 'ar' ? 'mr-3' : 'ml-3'}`}>{t.successMessage}</p>
                  </div>
                )}

                {submissionStatus === 'error' && (
                  <div className="mt-4 flex items-center text-red-500 bg-red-500/10 p-3 rounded-lg">
                    <AlertTriangle className="w-5 h-5" />
                    <p className={`text-sm font-medium ${language === 'ar' ? 'mr-3' : 'ml-3'}`}>{t.errorMessage}</p>
                  </div>
                )}
              </div>
              {/* --- END OF DYNAMIC STATUS --- */}

            </form>
          </div>

          <div className={`w-full lg:w-2/5 p-8 md:p-12 ${themeClasses.infoPanelBg} ${language === 'ar' ? 'lg:border-r' : 'lg:border-l'} ${themeClasses.borderColor}`}>
            <div className="space-y-8">
              <div>
                <h3 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
                  {t.contactInfoTitle}
                </h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <Mail className={`w-5 h-5 mt-1 flex-shrink-0 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className={`font-semibold ${themeClasses.textPrimary}`}>{t.email}</p>
                      <a href="mailto:ksardata@gmail.com" className={`${themeClasses.textSecondary} hover:underline`}>ksardata@gmail.com</a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className={`w-5 h-5 mt-1 flex-shrink-0 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className={`font-semibold ${themeClasses.textPrimary}`}>{t.location}</p>
                      <p className={themeClasses.textSecondary}>{t.locationValue}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className={`w-5 h-5 mt-1 flex-shrink-0 ${themeClasses.textAccent} ${language === 'ar' ? 'ml-4' : 'mr-4'}`} />
                    <div>
                      <p className={`font-semibold ${themeClasses.textPrimary}`}>{t.hours}</p>
                      <p className={themeClasses.textSecondary}>{t.hoursValue}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className={`text-2xl font-bold mb-6 ${themeClasses.textPrimary}`}>
                  {t.socialTitle}
                </h3>
                <div className="flex space-x-4" dir="ltr">
                  {t.socialLinks.map((social) => (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`p-3 rounded-full border ${themeClasses.borderColor} ${themeClasses.cardBg} ${social.color} transition-all duration-300 transform hover:scale-110`}
                    >
                      <social.icon className="w-6 h-6" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      
    </div>
  );
};

export default ContactUsPage;