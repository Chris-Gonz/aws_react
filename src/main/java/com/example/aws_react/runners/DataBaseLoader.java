package com.example.aws_react.runners;

import com.example.aws_react.student.Student;
import com.github.javafaker.Faker;
import com.example.aws_react.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataBaseLoader {
    //I need to insert 1000 students into the database
    
    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {

            if (repository.count() == 0){
                Faker faker = new Faker();
    
                for (int i = 0; i < 1000; i++) {
                    Student student = new Student();
                    student.setName(faker.name().fullName());
                    student.setEmail(faker.internet().emailAddress());
                    repository.save(student);
                } 

            }
        };
    }
}