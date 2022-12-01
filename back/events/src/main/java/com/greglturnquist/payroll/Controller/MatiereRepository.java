package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Matiere;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MatiereRepository extends JpaRepository<Matiere, Long> {}
