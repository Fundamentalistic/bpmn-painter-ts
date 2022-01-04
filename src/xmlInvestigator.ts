const xmlToInvestigate = `
<?xml version="1.0" encoding="UTF-8"?>
    
    <bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_166kp7m" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.0.0">
        
        <bpmn:process id="Process_Test_Strategy" isExecutable="true" camunda:versionTag="20211201-142">
        
            <bpmn:subProcess id="Task_Call_ID_3">
      
                    <bpmn:endEvent id="EndEvent_Call_ID_Main_Process">
                        <bpmn:outgoing>SequenceFlow_To_extra</bpmn:outgoing>
                    </bpmn:endEvent>
                    <bpmn:sequenceFlow id="SequenceFlow_To_extra" sourceRef="EndEvent_Call_ID_Main_Process" targetRef="extra" />
                    <bpmn:endEvent id="extra" name="">
                        <bpmn:incoming>SequenceFlow_To_extra</bpmn:incoming>
                    </bpmn:endEvent>
                    <bpmn:sequenceFlow id="SequenceFlow_To_End_Main_Process" sourceRef="Task_Call_ID_3" targetRef="EndEvent_Call_ID_Main_Process" />
                    <bpmn:group id="rootGroup0" />
      
            </bpmn:subProcess>
            
            
        
        </bpmn:process>
        
        <bpmndi:BPMNDiagram id="BPMNDiagram_1">
            <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Test_Strategy">
            
                <bpmndi:BPMNShape id="SubProcess_19l17uu_di" bpmnElement="Task_Call_ID_3" isExpanded="true">
                    <dc:Bounds x="200" y="270" width="980" height="1140" />
                </bpmndi:BPMNShape>
                
               <bpmndi:BPMNShape id="EndEvent_00crsp0_di" bpmnElement="EndEvent_Call_ID_Main_Process">
                    <dc:Bounds x="732" y="1502" width="36" height="36" />
               </bpmndi:BPMNShape>
               
               <bpmndi:BPMNShape id="EndEvent_extra" bpmnElement="extra">
                    <dc:Bounds x="932" y="1702" width="36" height="36" />
               </bpmndi:BPMNShape>
               
               <bpmndi:BPMNEdge id="SequenceFlow_1u1v1rc_di" bpmnElement="SequenceFlow_To_End_Main_Process">
                    <di:waypoint x="750" y="1410" />
                    <di:waypoint x="750" y="1502" />
               </bpmndi:BPMNEdge>
               
               <bpmndi:BPMNEdge id="SequenceFlow_1u1v1r_extra" bpmnElement="SequenceFlow_To_extra">
                    
               </bpmndi:BPMNEdge>
               
               <bpmndi:BPMNShape id="rootGroup0_di" bpmnElement="rootGroup0">
                    <dc:Bounds x="466.6666666666667" y="-120" width="583.3333333333334" height="360" />
               </bpmndi:BPMNShape>
                 
            </bpmndi:BPMNPlane>
        </bpmndi:BPMNDiagram>
        
    </bpmn:definitions>
`;

export default function exportXml() {
    return xmlToInvestigate;
};