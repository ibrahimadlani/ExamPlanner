package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Creneau;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CreneauRepository extends JpaRepository<Creneau, Long> {
}
