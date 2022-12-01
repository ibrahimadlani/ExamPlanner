package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Examen;
import com.greglturnquist.payroll.Model.Fermeture;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FermetureRepository extends JpaRepository<Fermeture, Long> {
}
