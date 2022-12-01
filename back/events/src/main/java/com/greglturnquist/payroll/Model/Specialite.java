package com.greglturnquist.payroll.Model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Specialite {
    private @Id
    @GeneratedValue
    Long id;
    private String titre;
    @Column(columnDefinition="TEXT")
    private String description;
    @ManyToMany
    private List<Matiere> matieres;

    public Specialite(String titre, String description, List<Matiere> matieres){
        this.titre = titre;
        this.description = description;
        this.matieres = matieres;
    }

    public Specialite(){}

    public String getDescription() {
        return description;
    }

    public String getTitre() {
        return titre;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setTitre(String titre) {
        this.titre = titre;
    }

    public List<Matiere> getMatieres() {
        return matieres;
    }

    public void setMatieres(List<Matiere> matieres) {
        this.matieres = matieres;
    }

    @Override
    public String toString() {
        return "Specialite{" +
                "id=" + id +
                ", titre='" + titre + '\'' +
                ", description='" + description + '\'' +
                ", matieres=" + matieres +
                '}';
    }
}
