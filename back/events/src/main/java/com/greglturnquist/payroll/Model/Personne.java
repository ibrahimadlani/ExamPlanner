package com.greglturnquist.payroll.Model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Personne {
    private @Id @GeneratedValue Long id;
    private String prenom;
    private String nom;
    private LocalDate naissance;
    private boolean sexe;
    private boolean enseignant;

    public Personne(){
        this.prenom = "";
        this.nom = "";
        this.naissance = LocalDate.now();
        this.sexe = true;
        this.enseignant = false;
    }
    public Personne(String prenom, String nom, LocalDate naissance, boolean sexe, boolean enseignant){
        this.prenom = prenom;
        this.nom = nom;
        this.naissance = naissance;
        this.sexe = sexe;
        this.enseignant = enseignant;
    }

    public LocalDate getNaissance() {
        return naissance;
    }

    public boolean isEnseignant() {
        return enseignant;
    }

    public Long getId() {
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

    public void setNaissance(LocalDate naissance) {
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
