package com.crud.ops.crud_operations.configs.batchConfig;

import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.JobExecutionListener;
import org.springframework.stereotype.Component;

@Component
public class JobCompletionNotificationListener implements JobExecutionListener {

    @Override
    public void beforeJob(JobExecution jobExecution) {
        // Code to execute before the job starts
//        System.out.println("Job is about to start");
    }

    @Override
    public void afterJob(JobExecution jobExecution) {
        // Code to execute after the job completes
        if (jobExecution.getStatus().isUnsuccessful()) {
//            System.out.println("Job failed");
        } else {
//            System.out.println("Job completed successfully");
        }
    }
}