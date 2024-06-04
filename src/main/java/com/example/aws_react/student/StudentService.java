package com.example.aws_react.student;


import java.util.List;

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

        studentRepository.save(student);

        // throw new UnsupportedOperationException("Unimplemented method 'addStudent'");
    }


}
