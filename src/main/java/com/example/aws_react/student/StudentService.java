package com.example.aws_react.student;


import java.util.List;

import com.example.aws_react.student.exception.StudentNotFoundException;
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

        try {
            //check is student email already exists
            if( studentRepository.existsByEmail(student.getEmail())){
                throw new
            }
        }

        studentRepository.save(student);

        // throw new UnsupportedOperationException("Unimplemented method 'addStudent'");
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
