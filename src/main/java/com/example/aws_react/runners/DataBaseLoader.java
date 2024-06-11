package com.example.aws_react.runners;

import com.example.aws_react.student.Gender;
import com.example.aws_react.student.Student;
import com.github.javafaker.Faker;
import com.example.aws_react.student.StudentRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Random;

@Configuration
public class DataBaseLoader {
    //I need to insert 1000 students into the database
    Gender[] genders = Gender.values();
    Random randomGender = new Random();

    @Bean
    CommandLineRunner initDatabase(StudentRepository repository) {
        return args -> {

            if (repository.count() == 0){
                Faker faker = new Faker();
    
                for (int i = 0; i < 100; i++) {
                    Student student = new Student();
                    student.setName(faker.name().fullName());
                    student.setEmail(faker.internet().emailAddress());
                    student.setGender(genders[randomGender.nextInt(genders.length)]);
                    repository.save(student);
                } 
            }
        };
    }
}