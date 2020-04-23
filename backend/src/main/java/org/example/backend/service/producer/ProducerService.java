package org.example.backend.service.producer;

import org.apache.camel.CamelContext;
import org.apache.camel.ProducerTemplate;
import org.example.backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerService {

    @Autowired
    private CamelContext producerCamelContext;

    public void sendStringToActiveMQ(List<String> objectToActiveMQ) {
        try {
            producerCamelContext.start();

            ProducerTemplate producerTemplate = producerCamelContext.createProducerTemplate();
            producerTemplate.sendBody("direct:start", objectToActiveMQ);
            producerCamelContext.stop();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
