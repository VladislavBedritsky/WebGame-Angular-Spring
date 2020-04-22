package org.example.backend.service.consumer;

import org.apache.camel.CamelContext;
import org.apache.camel.ConsumerTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ConsumerService {

    @Autowired
    private CamelContext consumerCamelContext;

    public List<String> getStringFromActiveMQ() {
        List<?> result = new ArrayList<>();
        try {
            consumerCamelContext.start();

            ConsumerTemplate consumerTemplate = consumerCamelContext.createConsumerTemplate();
            result = consumerTemplate.receiveBody("seda:end", List.class );
            consumerCamelContext.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }

        return (List<String>) result;
    }
}
