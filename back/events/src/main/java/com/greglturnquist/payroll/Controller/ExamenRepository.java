package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Examen;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExamenRepository extends JpaRepository<Examen, Long> {
}
