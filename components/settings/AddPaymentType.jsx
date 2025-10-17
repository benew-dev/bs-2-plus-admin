"use client";

import SettingsContext from "@/context/SettingsContext";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const AddPaymentType = () => {
  const { newPaymentType, error, clearErrors } = useContext(SettingsContext);
  const [platformName, setPlatformName] = useState("");
  const [platformNumber, setPlatformNumber] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
    newPaymentType(platformName, platformNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-emerald-50 py-6 sm:py-8 px-3 sm:px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
            Nouveau Moyen de Paiement
          </h1>
          <p className="text-sm sm:text-base text-slate-600">
            Ajoutez une plateforme de paiement mobile
          </p>
        </div>

        <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-white/20 backdrop-blur-sm rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  Ajouter un moyen de paiement
                </h2>
                <p className="text-xs sm:text-sm text-white/80">
                  Maximum 4 moyens autorisés
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Nom de la plateforme <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-green-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <input
                  type="text"
                  value={platformName}
                  onChange={(e) => setPlatformName(e.target.value)}
                  placeholder="Ex: WAAFI, D-MONEY, CAC-PAY..."
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-slate-700"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Minimum 3 caractères
              </p>
            </div>

            <div className="group">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 mb-2">
                Numéro de compte <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400 group-focus-within:text-green-500 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <input
                  type="tel"
                  value={platformNumber}
                  onChange={(e) => setPlatformNumber(e.target.value)}
                  placeholder="Ex: 77 12 34 56"
                  className="w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-slate-200 rounded-lg sm:rounded-xl focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all outline-none text-slate-700"
                />
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-500">
                Minimum 6 caractères
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 rounded-lg p-3 sm:p-4">
              <div className="flex gap-2 sm:gap-3">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <div>
                  <p className="text-xs sm:text-sm font-semibold text-green-800 mb-1">
                    Information
                  </p>
                  <p className="text-xs sm:text-sm text-green-700">
                    Ce numéro sera utilisé pour recevoir les paiements des
                    clients
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-slate-50 to-green-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border-2 border-dashed border-slate-300">
              <p className="text-xs uppercase text-slate-500 font-semibold mb-3">
                Aperçu
              </p>
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg sm:rounded-xl p-4 sm:p-6 text-white">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4">
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path
                      fillRule="evenodd"
                      d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <h3 className="text-base sm:text-lg font-bold mb-2 break-words">
                  {platformName || "Nom de la plateforme"}
                </h3>
                <p className="text-white/90 font-mono text-sm break-words">
                  {platformNumber || "Numéro de compte"}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
              <button
                onClick={submitHandler}
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transform hover:scale-105 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Ajouter
              </button>
              <button
                onClick={() => window.history.back()}
                className="px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-slate-300 text-slate-700 rounded-lg sm:rounded-xl font-semibold hover:bg-slate-50 transition-all text-sm sm:text-base"
              >
                Annuler
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPaymentType;
