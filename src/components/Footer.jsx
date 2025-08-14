import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Users, Eye, Mail, MessageCircle } from 'lucide-react';
import WhatsappIcon from './WhatsappIcon';

const Footer = ({ language, theme }) => {
    const translations = {
        ar: {
            ctaTitle: 'مستعد لاستكشاف مدينتك؟',
            ctaDescription: 'انغمس في البيانات، اكتشف رؤى جديدة، وكن مواطنًا أكثر اطلاعًا اليوم.',
            exploreButton: 'ابدأ الاستكشاف',
            quickLinks: 'روابط سريعة',
            connectTitle: 'تواصل معنا',
            copyright: 'الإصدار 1.1 | جميع الحقوق محفوظة © 2025',
            // MODIFICATION: Added new translation keys
            privacyPolicy: 'سياسة الخصوصية',
            termsOfUse: 'شروط الاستخدام',
            links: [
                { text: 'مستكشف الميزانية', path: '/search', icon: Search },
                { text: 'بيانات السكان', path: '/rgph', icon: Users },
                { text: 'رؤى وتصورات', path: '/insights', icon: Eye }
            ],
            contact: {
                email: 'تواصل عبر البريد',
                facebook: 'تابعنا على فيسبوك',
                whatsapp: 'راسلنا على واتساب'
            }
        },
        en: {
            ctaTitle: 'Ready to Explore Your City?',
            ctaDescription: 'Dive into the data, uncover new insights, and become a more informed citizen today.',
            exploreButton: 'Start Exploring',
            quickLinks: 'Quick Links',
            connectTitle: 'Connect With Us',
            copyright: 'Version – v1.1 | All Rights Reserved © 2025',
            // MODIFICATION: Added new translation keys
            privacyPolicy: 'Privacy Policy',
            termsOfUse: 'Terms of Use',
            links: [
                { text: 'Budget Explorer', path: '/search', icon: Search },
                { text: 'Population (RGPH)', path: '/rgph', icon: Users },
                { text: 'Insights & Visuals', path: '/insights', icon: Eye }
            ],
            contact: {
                email: 'Contact via Email',
                facebook: 'Follow on Facebook',
                whatsapp: 'Message on WhatsApp'
            }
        },
        fr: {
            ctaTitle: 'Prêt à Explorer Votre Ville ?',
            ctaDescription: 'Plongez dans les données, découvrez de nouvelles perspectives et devenez un citoyen mieux informé dès aujourd\'hui.',
            exploreButton: 'Commencer l\'Exploration',
            quickLinks: 'Liens Rapides',
            connectTitle: 'Contactez-nous',
            copyright: 'Version – v1.1 | Tous droits réservés © 2025',
            // MODIFICATION: Added new translation keys
            privacyPolicy: 'Politique de confidentialité',
            termsOfUse: 'Conditions d\'utilisation',
            links: [
                { text: 'Explorateur de Budget', path: '/search', icon: Search },
                { text: 'Population (RGPH)', path: '/rgph', icon: Users },
                { text: 'Aperçus et Visuels', path: '/insights', icon: Eye }
            ],
            contact: {
                email: 'Contacter par e-mail',
                facebook: 'Suivre sur Facebook',
                whatsapp: 'Message sur WhatsApp'
            }
        }
    };

    const t = translations[language] || translations.en;

    const themeClasses = {
        bg: theme === 'dark' ? 'bg-gray-900' : 'bg-white',
        textPrimary: theme === 'dark' ? 'text-white' : 'text-gray-900',
        textSecondary: theme === 'dark' ? 'text-gray-400' : 'text-gray-600',
        borderColor: theme === 'dark' ? 'border-gray-800' : 'border-gray-200',
        linkHover: theme === 'dark' ? 'hover:text-blue-400' : 'hover:text-blue-600',
        subtleLinkHover: theme === 'dark' ? 'hover:text-gray-200' : 'hover:text-gray-900',
    };

    return (
        <footer
            className={`${themeClasses.bg} border-t ${themeClasses.borderColor}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
            style={{ fontFamily: language === 'ar' ? 'Noto Kufi Arabic, sans-serif' : 'Inter, sans-serif' }}
        >
            <div className="container mx-auto px-6 py-16">
                {/* Top Section: CTA and Links */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
                    {/* ... (This entire section remains unchanged) ... */}
                    <div className="lg:col-span-1 hidden md:grid">
                        <h2 className={`text-2xl font-bold mb-3 ${themeClasses.textPrimary}`}>
                            {t.ctaTitle}
                        </h2>
                        <p className={`mb-6 ${themeClasses.textSecondary}`}>
                            {t.ctaDescription}
                        </p>
                        <Link
                            to="/search"
                            className={`inline-flex items-center px-6 py-3 text-sm font-bold rounded-full transition-transform transform hover:scale-105 group ${theme === 'dark' ? 'bg-blue-600 text-white hover:bg-blue-500' : 'bg-gray-900 text-white hover:bg-gray-700'}`}
                        >
                            {t.exploreButton}
                            <ArrowRight className={`w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 ${language === 'ar' ? 'mr-2 rotate-180 group-hover:-translate-x-1' : 'ml-2'}`} />
                        </Link>
                    </div>
                    <div className="lg:col-span-2 grid grid-cols-2 md:grid-cols-3 gap-8">
                        <div className="hidden md:block"></div>
                        <div>
                            <h3 className={`font-semibold mb-4 ${themeClasses.textPrimary}`}>{t.quickLinks}</h3>
                            <ul className="space-y-3">
                                {t.links.map(link => (
                                    <li key={link.path}>
                                        <Link to={link.path} className={`flex items-center text-sm ${themeClasses.textSecondary} ${themeClasses.linkHover} transition-colors`}>
                                            <link.icon className={`w-4 h-4 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                                            <span>{link.text}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className={`font-semibold mb-4 ${themeClasses.textPrimary}`}>{t.connectTitle}</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="/contactUs" className={`flex items-center text-sm ${themeClasses.textSecondary} ${themeClasses.linkHover} transition-colors`}>
                                        <Mail className={`w-4 h-4 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                                        <span>{t.contact.email}</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="https://www.facebook.com/profile.php?id=61578979396224" target="_blank" rel="noopener noreferrer" className={`flex items-center text-sm ${themeClasses.textSecondary} ${themeClasses.linkHover} transition-colors`}>
                                        <MessageCircle className={`w-4 h-4 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                                        <span>{t.contact.facebook}</span>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://wa.me/+212723208407?text=مرحيا!!"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`flex items-center text-sm ${themeClasses.textSecondary} hover:text-green-500 transition-colors`}
                                    >
                                        <WhatsappIcon className={`w-4 h-4 flex-shrink-0 ${language === 'ar' ? 'ml-3' : 'mr-3'}`} />
                                        <span>{t.contact.whatsapp}</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* MODIFICATION: Updated the Bottom Section for Copyright and new links */}
                <div className={`pt-8 border-t ${themeClasses.borderColor} text-center text-sm ${themeClasses.textSecondary}`}>
                    <span>{t.copyright}</span>
                    <span className="mx-2">|</span>
                    <Link
                        to="/privacy-policy"
                        className={`underline decoration-dotted underline-offset-2 transition-colors ${themeClasses.subtleLinkHover}`}
                    >
                        {t.privacyPolicy}
                    </Link>
                    <span className="mx-2">|</span>
                    <Link
                        to="/terms-of-use"
                        className={`underline decoration-dotted underline-offset-2 transition-colors ${themeClasses.subtleLinkHover}`}
                    >
                        {t.termsOfUse}
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;