// src/insights/rgphInsightConfigs.js

export const rgphInsights = [
  
  {
    id: "population_change_2014_2024",
    question: {
      en: "How has the municipal population changed from 2014 to 2024?",
      fr: "Comment la population municipale a-t-elle évolué de 2014 à 2024 ?",
      ar: "كيف تغير عدد السكان البلديين من 2014 إلى 2024؟"
    },
    type: "bar",
    description: {
      en: "Compare total municipal population between 2014 and 2024 by gender.",
      fr: "Comparer la population municipale totale entre 2014 et 2024 par sexe.",
      ar: "مقارنة إجمالي السكان البلديين بين 2014 و2024 حسب الجنس."
    },
    getData: (data) => {
      const populationData = data.filter(row => 
        row.fr_Indicateur && row.fr_Indicateur.includes("Population municipale")
      );
      
      // Sort by year in ascending order (2014 first, then 2024)
      const sortedData = populationData.sort((a, b) => a.Année - b.Année);
      
      const chartData = sortedData.map(row => ({
        year: row.Année,
        name: `${row.Année}`,
        value: row.Ensemble || 0,
        male: row.Masculin || 0,
        female: row.Féminin || 0
      }));
      
      return {
        chartData: chartData,
        filteredData: populationData
      };
    },
  },

  

  {
    id: "unemployment_rate_trend",
    question: {
      en: "How has the unemployment rate changed between 2014 and 2024?",
      fr: "Comment le taux de chômage a-t-il évolué entre 2014 et 2024 ?",
      ar: "كيف تغير معدل البطالة بين 2014 و2024؟"
    },
    type: "line",
    description: {
      en: "Compare unemployment rates by gender between 2014 and 2024.",
      fr: "Comparer les taux de chômage par sexe entre 2014 et 2024.",
      ar: "مقارنة معدلات البطالة حسب الجنس بين 2014 و2024."
    },
    getData: (data) => {
      const unemploymentData = data.filter(row => 
        row.fr_Indicateur && row.fr_Indicateur.includes("Taux de chômage")
      );
      
      // Sort by year in ascending order
      const sortedData = unemploymentData.sort((a, b) => a.Année - b.Année);
      
      const chartData = [];
      sortedData.forEach(row => {
        chartData.push(
          { year: row.Année, name: `${row.Année} - Ensemble`, value: parseFloat(row['Ensemble (%)']) || 0,  male: parseFloat(row['Femmes (%)']) || 0 },
        );
      });
      
      return {
        chartData: chartData,
        filteredData: unemploymentData
      };
    },
  },

  {
    id: "education_level_distribution",
    question: {
      en: "What is the current education level distribution in 2024?",
      fr: "Quelle est la répartition actuelle des niveaux d'éducation en 2024 ?",
      ar: "ما هو التوزيع الحالي لمستويات التعليم في 2024؟"
    },
    type: "pie",
    description: {
      en: "Show the distribution of education levels among the population in 2024.",
      fr: "Afficher la répartition des niveaux d'éducation dans la population en 2024.",
      ar: "إظهار توزيع مستويات التعليم بين السكان في 2024."
    },
    getData: (data) => {
      const educationData = data.filter(row => 
        row.Année === 2024 &&
        row.fr_Indicateur && row.fr_Indicateur.includes("niveau d'études") &&
        row['Ensemble (%)']
      );
      
      const chartData = educationData.map(row => ({
        category: row.fr_Indicateur.includes("primaire") ? "Primaire" :
                 row.fr_Indicateur.includes("préscolaire") ? "Préscolaire" :
                 row.fr_Indicateur.includes("secondaire collégial") ? "Collégial" :
                 row.fr_Indicateur.includes("secondaire qualifiant") ? "Qualifiant" :
                 row.fr_Indicateur.includes("supérieur") ? "Supérieur" : "Autre",
        name: row.fr_Indicateur.includes("primaire") ? "Primaire" :
              row.fr_Indicateur.includes("préscolaire") ? "Préscolaire" :
              row.fr_Indicateur.includes("secondaire collégial") ? "Collégial" :
              row.fr_Indicateur.includes("secondaire qualifiant") ? "Qualifiant" :
              row.fr_Indicateur.includes("supérieur") ? "Supérieur" : "Autre",
        value: parseFloat(row['Ensemble (%)']) || 0
      }));
      
      return {
        chartData: chartData,
        filteredData: educationData
      };
    },
  },

  {
    id: "marriage_age_trend",
    question: {
      en: "How has the average marriage age changed from 2014 to 2024?",
      fr: "Comment l'âge moyen au mariage a-t-il évolué de 2014 à 2024 ?",
      ar: "كيف تغير متوسط سن الزواج من 2014 إلى 2024؟"
    },
    type: "line",
    description: {
      en: "Track the evolution of average marriage age by gender over time.",
      fr: "Suivre l'évolution de l'âge moyen au mariage par sexe au fil du temps.",
      ar: "تتبع تطور متوسط سن الزواج حسب الجنس مع مرور الوقت."
    },
    getData: (data) => {
      const marriageAgeData = data.filter(row => 
        row.fr_Indicateur && row.fr_Indicateur.includes("Part des divorcé.e.s parmi les 15-59 (%)")
      );
      
      // Sort by year in ascending order
      const sortedData = marriageAgeData.sort((a, b) => a.Année - b.Année);
      
      const chartData = [];
      sortedData.forEach(row => {
        chartData.push(
          
          { year: row.Année, name: `${row.Année} - Ensemble`, value: parseFloat(row['Ensemble (%)']) || 0 }
        );
      });
      
      return {
        chartData: chartData,
        filteredData: marriageAgeData
      };
    },
  },

  {
    id: "housing_conditions_2024",
    question: {
      en: "What are the current housing conditions and amenities in 2024?",
      fr: "Quelles sont les conditions de logement et les équipements actuels en 2024 ?",
      ar: "ما هي ظروف السكن والمرافق الحالية في 2024؟"
    },
    type: "bar",
    description: {
      en: "Show the percentage of households with various amenities in 2024.",
      fr: "Afficher le pourcentage de ménages avec diverses commodités en 2024.",
      ar: "إظهار نسبة الأسر التي تتوفر على مختلف المرافق في 2024."
    },
    getData: (data) => {
      const housingData = data.filter(row => 
        row.Année === 2024 &&
        row.fr_Indicateur && (
          row.fr_Indicateur.includes("disposant d'une cuisine") ||
          row.fr_Indicateur.includes("disposant de W.-C.") ||
          row.fr_Indicateur.includes("disposant de l'eau courante") ||
          row.fr_Indicateur.includes("disposant de l'électricité") ||
          row.fr_Indicateur.includes("raccordés au réseau public d'assainissement")
        )
      );
      
      const chartData = housingData.map(row => ({
        category: row.fr_Indicateur.includes("cuisine") ? "Cuisine" :
                 row.fr_Indicateur.includes("W.-C.") ? "W.C." :
                 row.fr_Indicateur.includes("eau courante") ? "Eau courante" :
                 row.fr_Indicateur.includes("électricité") ? "Électricité" :
                 row.fr_Indicateur.includes("assainissement") ? "Assainissement" : "Autre",
        name: row.fr_Indicateur.includes("cuisine") ? "Cuisine" :
              row.fr_Indicateur.includes("W.-C.") ? "W.C." :
              row.fr_Indicateur.includes("eau courante") ? "Eau courante" :
              row.fr_Indicateur.includes("électricité") ? "Électricité" :
              row.fr_Indicateur.includes("assainissement") ? "Assainissement" : "Autre",
        value: parseFloat(row.Ensemble) || 0
      }));
      
      return {
        chartData: chartData,
        filteredData: housingData
      };
    },
  },

  {
    id: "housing_type_distribution",
    question: {
      en: "What types of housing do residents live in?",
      fr: "Dans quels types de logements vivent les résidents ?",
      ar: "في أي أنواع من المساكن يعيش السكان؟"
    },
    type: "donut",
    description: {
      en: "Show the distribution of housing types in the municipality.",
      fr: "Afficher la répartition des types de logements dans la municipalité.",
      ar: "إظهار توزيع أنواع المساكن في البلدية."
    },
    getData: (data) => {
      const housingTypeData = data.filter(row => 
        row.Année === 2024 &&
        row.fr_Indicateur && (
          row.fr_Indicateur.includes("vivant dans un appartement") ||
          row.fr_Indicateur.includes("vivant dans une maison marocaine") ||
          row.fr_Indicateur.includes("vivant dans une villa") ||
          row.fr_Indicateur.includes("vivant dans une maison sommaire")
        )
      );
      
      const chartData = housingTypeData.map(row => ({
        category: row.fr_Indicateur.includes("appartement") ? "Appartement" :
                 row.fr_Indicateur.includes("maison marocaine") ? "Maison marocaine" :
                 row.fr_Indicateur.includes("villa") ? "Villa" :
                 row.fr_Indicateur.includes("sommaire") ? "Logement précaire" : "Autre",
        name: row.fr_Indicateur.includes("appartement") ? "Appartement" :
              row.fr_Indicateur.includes("maison marocaine") ? "Maison marocaine" :
              row.fr_Indicateur.includes("villa") ? "Villa" :
              row.fr_Indicateur.includes("sommaire") ? "Logement précaire" : "Autre",
        value: parseFloat(row.Ensemble) || 0
      }));
      
      return {
        chartData: chartData,
        filteredData: housingTypeData
      };
    },
  },

  {
    id: "household_size_evolution",
    question: {
      en: "How has the average household size changed from 2014 to 2024?",
      fr: "Comment la taille moyenne des ménages a-t-elle évolué de 2014 à 2024 ?",
      ar: "كيف تغير متوسط حجم الأسر من 2014 إلى 2024؟"
    },
    type: "bar",
    description: {
      en: "Compare average household size and number of households between 2014 and 2024.",
      fr: "Comparer la taille moyenne des ménages et le nombre de ménages entre 2014 et 2024.",
      ar: "مقارنة متوسط حجم الأسر وعدد الأسر بين 2014 و2024."
    },
    getData: (data) => {
      const householdData = data.filter(row => 
        row.fr_Indicateur && (
          row.fr_Indicateur.includes("Taille moyenne des ménages") ||
          row.fr_Indicateur.includes("Nombre de ménages")
        )
      );
      
      // Sort by year in ascending order
      const sortedData = householdData.sort((a, b) => a.Année - b.Année);
      
      const chartData = sortedData.map(row => ({
        year: row.Année,
        name: `${row.Année} - ${row.fr_Indicateur.includes("Taille") ? "Taille moyenne" : "Nombre (milliers)"}`,
        value: row.fr_Indicateur.includes("Taille") ? 
          parseFloat(row.Ensemble) || 0 : 
          (parseFloat(row.Ensemble) || 0) / 1000
      }));
      
      return {
        chartData: chartData,
        filteredData: householdData
      };
    },
  },

  {
    id: "housing_ownership_trend",
    question: {
      en: "How has housing ownership vs rental changed from 2014 to 2024?",
      fr: "Comment la propriété immobilière par rapport à la location a-t-elle évolué de 2014 à 2024 ?",
      ar: "كيف تغيرت ملكية المساكن مقابل الإيجار من 2014 إلى 2024؟"
    },
    type: "area",
    description: {
      en: "Track the evolution of housing ownership patterns over the decade.",
      fr: "Suivre l'évolution des modèles de propriété immobilière au cours de la décennie.",
      ar: "تتبع تطور أنماط ملكية المساكن خلال العقد."
    },
    getData: (data) => {
      const ownershipData = data.filter(row => 
        row.fr_Indicateur && (
          row.fr_Indicateur.includes("propriétaires") ||
          row.fr_Indicateur.includes("locataires")
        )
      );
      
      // Sort by year in ascending order
      const sortedData = ownershipData.sort((a, b) => a.Année - b.Année);
      
      const chartData = sortedData.map(row => ({
        year: row.Année,
        name: `${row.Année}`,
        value: parseFloat(row.Ensemble) || 0,
        category: row.fr_Indicateur.includes("propriétaires") ? "Propriétaires" : "Locataires"
      }));
      
      return {
        chartData: chartData,
        filteredData: ownershipData
      };
    },
  },

  {
    id: "economic_activity_gender_gap",
    question: {
      en: "What is the gender gap in economic activity rates?",
      fr: "Quel est l'écart entre les sexes dans les taux d'activité économique ?",
      ar: "ما هي الفجوة بين الجنسين في معدلات النشاط الاقتصادي؟"
    },
    type: "radar",
    description: {
      en: "Compare economic activity and unemployment rates between men and women.",
      fr: "Comparer les taux d'activité économique et de chômage entre hommes et femmes.",
      ar: "مقارنة معدلات النشاط الاقتصادي والبطالة بين الرجال والنساء."
    },
    getData: (data) => {
      const economicData = data.filter(row => 
        row.Année === 2024 &&
        row.fr_Indicateur && (
          row.fr_Indicateur.includes("Taux d'activité") ||
          row.fr_Indicateur.includes("Taux de chômage")
        )
      );
      
      const chartData = [];
      economicData.forEach(row => {
        const indicator = row.fr_Indicateur.includes("activité") ? "Taux d'activité" : "Taux de chômage";
        chartData.push(
          { subject: `${indicator} - H`, value: parseFloat(row['Masculin (%)']) || 0 },
          { subject: `${indicator} - F`, value: parseFloat(row['Féminin (%)']) || 0 }
        );
      });
      
      return {
        chartData: chartData,
        filteredData: economicData
      };
    },
  }

];

export const getRgphInsightById = (id) => {
  return rgphInsights.find(insight => insight.id === id);
};