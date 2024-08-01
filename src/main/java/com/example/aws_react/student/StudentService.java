package com.example.aws_react.student;


import java.util.List;

import com.example.aws_react.student.exception.BadRequestException;
import com.example.aws_react.student.exception.StudentNotFoundException;
import com.github.javafaker.Bool;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class StudentService {
    
    private final StudentRepository studentRepository;

    public List<Student> getAllStudents(){
        return studentRepository.findAll();
    }

    public void addStudent(Student student) {
        // TODO: validation checks
        boolean emailExists = studentRepository.existsByEmail(student.getEmail());

        if(emailExists) {
            throw new BadRequestException("Email " + student.getEmail() + " is already taken");
        }
        studentRepository.save(student);
    }

    public void deleteStudent(Long studentId) {
        if(!studentRepository.existsById(studentId)) {
            throw new StudentNotFoundException("Student not found");
        }
        studentRepository.deleteById(studentId);
    }


    public void updateStudent(Student student) {
        studentRepository.save(student);
    }
}
