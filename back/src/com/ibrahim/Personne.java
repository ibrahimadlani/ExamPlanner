package com.ibrahim;

import java.util.Date;

public class Personne {
    private int id;
    private String prenom;
    private String nom;
    private Date naissance;
    private boolean sexe;
    private boolean enseignant;

    public Personne(){
        this.id = 0;
        this.prenom = "";
        this.nom = "";
        this.naissance = new Date(1969, 4,20);
        this.sexe = true;
        this.enseignant = false;
    }
    public Personne(int id, String prenom, String nom, Date naissance, boolean sexe, boolean enseignant){
        this.id = id;
        this.prenom = prenom;
        this.nom = nom;
        this.naissance = naissance;
        this.sexe = sexe;
        this.enseignant = enseignant;
    }

    public Date getNaissance() {
        return naissance;
    }

    public boolean isEnseignant() {
        return enseignant;
    }

    public int getId() {
        return id;
    }

    public boolean isSexe() {
        return sexe;
    }

    public String getNom() {
        return nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setId(int id) {
        this.id = id;
    }

    public void setNaissance(Date naissance) {
        this.naissance = naissance;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public void setSexe(boolean sexe) {
        this.sexe = sexe;
    }

    public void setEnseignant(boolean enseignant) {
        this.enseignant = enseignant;
    }
}
