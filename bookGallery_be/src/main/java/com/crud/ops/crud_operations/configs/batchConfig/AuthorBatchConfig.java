package com.crud.ops.crud_operations.configs.batchConfig;

import com.crud.ops.crud_operations.dtosI.Book4BatchDto;
import com.crud.ops.crud_operations.dtosI.BookReviewIDto;
import com.crud.ops.crud_operations.models.Author;
import com.crud.ops.crud_operations.repositories.AuthorRepository;
import com.crud.ops.crud_operations.repositories.BookRepository;
import com.crud.ops.crud_operations.repositories.BookReviewRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.launch.support.RunIdIncrementer;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.batch.item.data.RepositoryItemWriter;
import org.springframework.batch.item.file.FlatFileItemReader;
import org.springframework.batch.item.file.LineMapper;
import org.springframework.batch.item.file.builder.FlatFileItemReaderBuilder;
import org.springframework.batch.item.file.mapping.BeanWrapperFieldSetMapper;
import org.springframework.batch.item.file.mapping.DefaultLineMapper;
import org.springframework.batch.item.file.transform.DelimitedLineTokenizer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.PlatformTransactionManager;


@Slf4j
@Configuration
@EnableBatchProcessing
public class AuthorBatchConfig {

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private JobCompletionNotificationListener listener;

    PasswordEncoder passwordEncoder =  new BCryptPasswordEncoder();

    @Bean
    public FlatFileItemReader<Author> authorReader() {
        return new FlatFileItemReaderBuilder<Author>()
                .name("personItemReader")
                .resource(new ClassPathResource("author.csv"))
                .linesToSkip(1)
                .lineMapper(AuthorLineMapper())
                .targetType(Author.class)
                .build();
    }

    private LineMapper<Author> AuthorLineMapper() {
        DefaultLineMapper<Author> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("id", "userId", "firstName", "lastName", "gender", "email", "phone", "dateOfBirth", "jobTitle","role","password");
        BeanWrapperFieldSetMapper<Author> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Author.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }

    @Bean
    public ItemProcessor<Author, Author> authorProcessor() {
        return author -> {
            author.setPassword(passwordEncoder.encode(author.getPassword()));
            return author;
        };
    }


    @Bean
    RepositoryItemWriter<Author> authorWriter() {
        RepositoryItemWriter<Author> writer = new RepositoryItemWriter<>();
        writer.setRepository(authorRepository);
        writer.setMethodName("save");
        return writer;
    }


    @Bean
    public Job importJob(JobRepository jobRepository, Step authorStep, Step bookStep, Step bookReviewStep) {
        return new JobBuilder("importPersons -> book -> bookReview", jobRepository)
                .start(authorStep)
                .next(bookStep)
                .next(bookReviewStep)
                .listener(listener)
                .build();
    }

    @Bean
    public Step authorStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("csv-import-step-for-person", jobRepository)
                .<Author, Author>chunk(10, transactionManager)
                .reader(authorReader())
                .processor(authorProcessor())
                .writer(authorWriter())
                .build();
    }

    /*---------------------- Book Steps-----------------------*/
    @Bean
    public Step bookStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("import book ", jobRepository)
                .<Book4BatchDto, Book4BatchDto>chunk(10, transactionManager)
                .reader(bookReader())
                .processor(bookProcessor())
                .writer(bookWriter())
                .build();
    }


    @Bean
    public FlatFileItemReader<Book4BatchDto> bookReader() {
        return new FlatFileItemReaderBuilder<Book4BatchDto>()
                .name("bookItemReader")
                .resource(new ClassPathResource("book.csv"))
                .linesToSkip(1)
                .lineMapper(bookLineMapper())
                .targetType(Book4BatchDto.class)
                .build();
    }

    private LineMapper<Book4BatchDto> bookLineMapper() {
        DefaultLineMapper<Book4BatchDto> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("bookId", "authorId", "bookTitle", "bookDescription","image");
        BeanWrapperFieldSetMapper<Book4BatchDto> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(Book4BatchDto.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }

    @Bean
    public ItemProcessor<Book4BatchDto, Book4BatchDto> bookProcessor() {
        return book -> {
            return book;
        };
    }

    @Bean
    public ItemWriter<Book4BatchDto> bookWriter() {
        return items -> {
            int i = 0;
            for (Book4BatchDto book : items) {
                bookRepository.saveBook(
                        book.getBookId(),
                        book.getBookTitle(),
                        book.getBookDescription(),
                        book.getAuthor(),
                        book.getImage()
                );
            }
        };
    }

    @Bean
    public Job importBookJob(JobRepository jobRepository, Step bookStep) {
        return new JobBuilder("importBookJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .listener(listener)
                .start(bookStep)

                .build();
    }

    /*---------------------- Book Review Steps-----------------------*/
    @Autowired
    private BookReviewRepository bookReviewRepository;


    private LineMapper<BookReviewIDto> bookReviewLineMapper() {
        DefaultLineMapper<BookReviewIDto> lineMapper = new DefaultLineMapper<>();
        DelimitedLineTokenizer lineTokenizer = new DelimitedLineTokenizer();
        lineTokenizer.setDelimiter(",");
        lineTokenizer.setStrict(false);
        lineTokenizer.setNames("bookReviewId", "bookReviewAuthor", "bookReviewTitle", "bookReview", "book", "bookReviewRating");
        BeanWrapperFieldSetMapper<BookReviewIDto> fieldSetMapper = new BeanWrapperFieldSetMapper<>();
        fieldSetMapper.setTargetType(BookReviewIDto.class);
        lineMapper.setLineTokenizer(lineTokenizer);
        lineMapper.setFieldSetMapper(fieldSetMapper);
        return lineMapper;
    }


    @Bean
    public FlatFileItemReader<BookReviewIDto> bookReviewReader() {
        return new FlatFileItemReaderBuilder<BookReviewIDto>()
                .name("personItemReader")
                .resource(new ClassPathResource("bookReview.csv"))
                .linesToSkip(1)
                .lineMapper(bookReviewLineMapper())
                .targetType(BookReviewIDto.class)
                .build();
    }

    @Bean
    public ItemProcessor<BookReviewIDto, BookReviewIDto> bookReviewProcessor() {
        return bookReview -> {
            return bookReview;
        };
    }

    @Bean
    public ItemWriter<BookReviewIDto> bookReviewWriter() {
        return items -> {
            for (BookReviewIDto bookReview : items) {
                bookReviewRepository.saveBookReview(
                        bookReview.getBookReviewId(), bookReview.getBookReviewAuthor(), bookReview.getBookReviewTitle(), bookReview.getBookReview(), bookReview.getBookReviewRating(), bookReview.getBook()
                );
            }
        };
    }

    @Bean
    public Job importBookReviewJob(JobRepository jobRepository, Step bookReviewStep) {
        return new JobBuilder("importBookReviewJob", jobRepository)
                .incrementer(new RunIdIncrementer())
                .start(bookReviewStep)
                .listener(listener)
                .build();
    }

    @Bean
    public Step bookReviewStep(JobRepository jobRepository, PlatformTransactionManager transactionManager) {
        return new StepBuilder("bookReviewStep", jobRepository)
                .<BookReviewIDto, BookReviewIDto>chunk(10, transactionManager)
                .reader(bookReviewReader())
                .processor(bookReviewProcessor())
                .writer(bookReviewWriter())
                .build();
    }

}