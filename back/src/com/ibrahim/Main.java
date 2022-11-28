package com.ibrahim;

import java.util.*;

public class Main {

    public static void main(String[] args) {
	// TESTS



        //Enseignants
        Personne ibrahim_adlani = new Personne(1,"Ibrahim","ADLANI", new Date(2001,3,8), true, true);
        Personne alcide_faucheron = new Personne(2,"Alcide","FAUCHERON", new Date(2001,3,8), true, true);
        Personne maxence_duconseil = new Personne(3,"Maxence","DUCONSEIL", new Date(2001,4,15), true, true);
        Personne mathias_dupey = new Personne(4,"Mathias","DUPEY", new Date(2001,3,8), true, true);
        Personne nadir_yala = new Personne(5,"Nadir","YALA", new Date(2001,3,8), true, true);
        Personne yacine_schamele = new Personne(6,"Yacine","SCHAMELE", new Date(2001,3,8), true, true);
        Personne aymane_elkhazenti = new Personne(7,"Aymane","EL KHAZENTI", new Date(2001,3,8), true, true);
        Personne gracita_vincent = new Personne(8,"Gracita","VINCENT", new Date(2001,3,8), false, true);
        Personne esther_lawson = new Personne(9,"Esther","LAWSON", new Date(2001,3,8), false, true);



        //Matieres
        Matiere mecanique = new Matiere(1,"Mécanique","La mécanique est la branche de la science qui étudie le mouvement des systèmes matériels et leurs déformations, en relation avec les forces qui provoquent ou modifient ce mouvement ou ces déformations.", ibrahim_adlani,60);
        Matiere economie = new Matiere(2,"Économie","Ensemble des activités d'une collectivité humaine relatives à la production, à la distribution et à la consommation des richesses", alcide_faucheron,60);
        Matiere communication = new Matiere(3,"Communication","Communication is usually defined as the transmission of information. The term can also refer just to the message communicated or to the field of inquiry studying such transmissions.", mathias_dupey,60);
        Matiere mathematique = new Matiere(4,"Mathématique","Mathematics is an area of knowledge that includes topics as numbers, formulas and related structures, shapes and the spaces in which they are contained, and quantities and their changes.", maxence_duconseil,60);

        Matiere unity = new Matiere(5,"Unity","Unity is a cross-platform game engine developed by Unity Technologies, first announced and released in June 2005 at Apple Worldwide Developers Conference as a Mac OS X game engine.", nadir_yala,60);
        Matiere modelisation_vectorielle = new Matiere(6,"Modelisation Vectorielle","L’expression œuvre d’art vectorielle décrit tout art réalisé avec un logiciel d’illustration vectorielle, comme Illustrator. L’œuvre d’art vectorielle se compose de graphiques vectoriels, qui sont des images créées à l’aide de formules mathématiques.", yacine_schamele,60);

        Matiere python = new Matiere(7,"Python","Python is a high-level, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation. Python is dynamically-typed and garbage-collected.", aymane_elkhazenti,60);
        Matiere analyse_statistique = new Matiere(8,"Analyse Statistique","L'analyse statistique est une composante de l'analyse des données. Dans le contexte de l'informatique décisionnelle (BI, Business Intelligence), l'analyse statistique implique la collecte et l'examen de tous les échantillons de données tirés d'un jeu de données.", gracita_vincent,60);

        Matiere arduino = new Matiere(9,"Arduino","Arduino is an open-source hardware and software company, project, and user community that designs and manufactures single-board microcontrollers and microcontroller kits for building digital devices.", esther_lawson,60);
        Matiere electronique = new Matiere(10,"Electronique","The field of electronics is a branch of physics and electrical engineering that deals with the emission, behaviour and effects of electrons using electronic devices.", ibrahim_adlani,60);

        Matiere data_mining = new Matiere(11,"Data Mining","Data mining is the process of extracting and discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems.", alcide_faucheron,60);
        Matiere data_cleansing = new Matiere(12,"Data Cleansing","Data cleansing or data cleaning is the process of detecting and correcting corrupt or inaccurate records from a record set, table, or database and refers to identifying incomplete, incorrect, inaccurate or irrelevant parts of the data and then replacing, modifying, or deleting the dirty or coarse data.", maxence_duconseil,60);

        Matiere reseau = new Matiere(13,"Reseau","A computer network is a set of computers sharing resources located on or provided by network nodes. The computers use common communication protocols over digital interconnections to communicate with each other.", mathias_dupey,60);
        Matiere pen_test = new Matiere(14,"Penetration Test","A penetration test, colloquially known as a pen test or ethical hacking, is an authorized simulated cyberattack on a computer system, performed to evaluate the security of the system; this is not to be confused with a vulnerability assessment.", nadir_yala,60);

        List<Matiere> toutes_matieres = Arrays.asList(mecanique,economie,communication,mathematique,unity,modelisation_vectorielle,python,analyse_statistique,arduino,electronique,data_mining,data_cleansing,reseau,pen_test);

        //Spécialités
        List<Matiere> intelligence_artificielle_matieres = Arrays.asList(data_mining,data_cleansing,economie,mathematique);
        Specialite intelligence_artificielle = new Specialite(1,"Inteligence Artificielle", "En termes simples, l'IA, qui signifie « intelligence artificielle », désigne des systèmes ou des machines qui imitent l'intelligence humaine pour effectuer des tâches et qui peuvent s'améliorer de manière itérative en fonction des informations qu'ils recueillent.",intelligence_artificielle_matieres);

        List<Matiere> visual_computing_matieres = Arrays.asList(unity,modelisation_vectorielle,mecanique,mathematique);
        Specialite visual_computing = new Specialite(2,"Visual Computing", "Visual computing is a generic term for all computer science disciplines dealing with images and 3D models, such as computer graphics, image processing, visualization, computer vision, virtual and augmented reality and video processing.",visual_computing_matieres);

        List<Matiere> business_intelligence_matieres = Arrays.asList(python,analyse_statistique,economie,communication);
        Specialite business_intelligence = new Specialite(3,"Business Intelligence", "Business intelligence comprises the strategies and technologies used by enterprises for the data analysis and management of business information.",business_intelligence_matieres);

        List<Matiere> informatique_embarque_matieres = Arrays.asList(arduino,electronique,mecanique,communication);
        Specialite informatique_embarque = new Specialite(4,"Informatique Embarquée", "On désigne sous le terme informatique embarquée les aspects logiciels se trouvant à l'intérieur des équipements n'ayant pas une vocation purement informatique.",informatique_embarque_matieres);

        List<Matiere> cyber_securite_matieres = Arrays.asList(pen_test,reseau,mathematique);
        Specialite cyber_securite = new Specialite(5,"Cyber-Securité", "Cyber security is the application of technologies, processes, and controls to protect systems, networks, programs, devices and data from cyber attacks. It aims to reduce the risk of cyber attacks and protect against the unauthorised exploitation of systems, networks, and technologies.",cyber_securite_matieres);



        //Indisponibilités
        Indisponibilite indispo_ia_1 = new Indisponibilite(1,new Date(2022,10,21,9,0), 60, ibrahim_adlani );
        Indisponibilite indispo_ia_2 = new Indisponibilite(2,new Date(2022,10,23,11,0), 90, ibrahim_adlani);

        Indisponibilite indispo_af_1 = new Indisponibilite(3,new Date(2022,10,22,14,0), 60, alcide_faucheron);
        Indisponibilite indispo_af_2 = new Indisponibilite(4,new Date(2022,10,24,13,0), 90, alcide_faucheron);

        Indisponibilite indispo_mdy_1 = new Indisponibilite(5,new Date(2022,10,25,9,0), 60, mathias_dupey);
        Indisponibilite indispo_mdy_2 = new Indisponibilite(6,new Date(2022,10,21,13,0), 90, mathias_dupey);

        Indisponibilite indispo_mdl_1 = new Indisponibilite(7,new Date(2022,10,22,10,0), 90, maxence_duconseil);
        Indisponibilite indispo_mdl_2 = new Indisponibilite(8,new Date(2022,10,25,16,0), 60, maxence_duconseil);

        Indisponibilite indispo_ny_1 = new Indisponibilite(9,new Date(2022,10,23,15,0), 60, nadir_yala);
        Indisponibilite indispo_ny_2 = new Indisponibilite(10,new Date(2022,10,25,13,0), 90, nadir_yala);

        //Examens
        Examen test_exam = new Examen(1,new Date(2022,10,23,23,0),60, pen_test);



        //Paramètres planning
        List<Indisponibilite> list_indisponibilites = Arrays.asList(indispo_ia_1,indispo_ia_2,indispo_af_1,indispo_af_2,indispo_mdy_1,indispo_mdy_2,indispo_mdl_1,indispo_mdl_2,indispo_ny_1,indispo_ny_2);
        List<Examen> list_examens = Arrays.asList(test_exam);



        //Planning (Lundi 21 Novembre 2022 - Vendredi 25 Novembre 2022)
        Planning planing_novembre_3 = new Planning(1,new Date(2022,11,21),new Date(2022,11,25), list_indisponibilites, 8,0, 17,0,toutes_matieres);


        //Test





    }
}
