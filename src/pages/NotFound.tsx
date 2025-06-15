
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="text-center p-8 bg-slate-800/50 rounded-2xl shadow-2xl backdrop-blur-lg border border-slate-700">
        <h1 className="text-6xl font-bold mb-4 gradient-text animate-pulse">{t('not_found_page.title')}</h1>
        <p className="text-xl text-slate-300 mb-8">{t('not_found_page.description')}</p>
        <a href="/" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-transform transform hover:scale-105">
          {t('not_found_page.return_home')}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
