package com.greglturnquist.payroll.Controller;

import com.greglturnquist.payroll.Model.Specialite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SpecialiteRepository extends JpaRepository<Specialite, Long> {
}
