const testXml = `<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xmlns:camunda="http://camunda.org/schema/1.0/bpmn" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="Definitions_166kp7m" targetNamespace="http://bpmn.io/schema/bpmn" exporter="Camunda Modeler" exporterVersion="4.0.0">
  <bpmn:process id="Process_Test_Strategy" isExecutable="true" camunda:versionTag="20211201-142">
      <bpmn:subProcess id="Task_Call_ID_3">
          <bpmn:incoming>SequenceFlow_From_Main_To_Call_ID_Process</bpmn:incoming>
          <bpmn:outgoing>SequenceFlow_To_End_Main_Process</bpmn:outgoing>
          <bpmn:startEvent id="StartEvent_Call_ID_Main_Process">
              <bpmn:outgoing>Flow_To_Customer_Type_Main1</bpmn:outgoing>
          </bpmn:startEvent>
          <bpmn:endEvent id="EndEvent_Call_ID_Main_Process">
              <bpmn:incoming>DefaultFlow_After_Gateaway_For_Next_Call_Id_Selection</bpmn:incoming>
              <bpmn:incoming>Flow_To_EndEvent_Call_ID_Main_Process_After_Send_Response</bpmn:incoming>
          </bpmn:endEvent>
      <bpmn:callActivity id="Call_ID_1_Checks" name="Call ID 1 checks" calledElement="Call_ID_1">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_1_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_1_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:callActivity id="Call_Get_Next_Call_Id" name="Check next call" calledElement="CheckNextCallProcess">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_Get_Next_Call_Id</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Gateaway_For_Next_Call_Id_Selection</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:callActivity id="Call_ID_3_Checks" name="Call ID 3 checks" calledElement="Call_ID_3">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_3_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_3_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_3_Checks" sourceRef="Call_ID_3_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_1_Checks" sourceRef="Call_ID_1_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:sequenceFlow id="Flow_To_Call_ID_1_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_1_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '1'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_3_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_3_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '3'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Gateaway_For_Next_Call_Id_Selection" sourceRef="Call_Get_Next_Call_Id" targetRef="Gateaway_For_Next_Call_Id_Selection" />
      <bpmn:sequenceFlow id="DefaultFlow_After_Gateaway_For_Next_Call_Id_Selection" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="EndEvent_Call_ID_Main_Process" />
      <bpmn:exclusiveGateway id="Gateaway_For_Next_Call_Id_Selection" default="DefaultFlow_After_Gateaway_For_Next_Call_Id_Selection">
        <bpmn:incoming>Flow_To_Gateaway_For_Next_Call_Id_Selection</bpmn:incoming>
        <bpmn:outgoing>DefaultFlow_After_Gateaway_For_Next_Call_Id_Selection</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_3_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_1_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_4_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_5_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_6_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_7_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_8_Checks</bpmn:outgoing>
        <bpmn:outgoing>Flow_To_Call_ID_9_Checks</bpmn:outgoing>
      </bpmn:exclusiveGateway>
      <bpmn:serviceTask id="Task_Send_Response_After_Call_Id" name="Send response" camunda:modelerTemplate="ru.smsfinance.engine.decision.bpm.SendResponseListener" camunda:class="ru.smsfinance.engine.decision.bpm.SendResponseListener">
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_3_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_1_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_4_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_5_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_6_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_7_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_To_Send_Response_After_Call_ID_8_Checks</bpmn:incoming>
        <bpmn:incoming>Flow_0vp0zzp</bpmn:incoming>
        <bpmn:outgoing>Flow_To_EndEvent_Call_ID_Main_Process_After_Send_Response</bpmn:outgoing>
      </bpmn:serviceTask>
      <bpmn:sequenceFlow id="Flow_To_EndEvent_Call_ID_Main_Process_After_Send_Response" sourceRef="Task_Send_Response_After_Call_Id" targetRef="EndEvent_Call_ID_Main_Process" />
      <bpmn:callActivity id="Call_ID_4_Checks" name="Call ID 4 checks" calledElement="Call_ID_4">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_4_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_4_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_4_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_4_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '4'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_4_Checks" sourceRef="Call_ID_4_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:callActivity id="Call_ID_5_Checks" name="Call ID 5 checks" calledElement="Call_ID_5">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_5_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_5_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_5_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_5_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '5'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_5_Checks" sourceRef="Call_ID_5_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:callActivity id="Task_Customer_Type_Main" name="Customer type" calledElement="CustomerTypeProcess">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Customer_Type_Main</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Customer_Type_For_Product_Main</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Customer_Type_Main1" sourceRef="StartEvent_Call_ID_Main_Process" targetRef="Call_IsPhantomProcess_From_MainProcess" />
      <bpmn:sequenceFlow id="Flow_To_Customer_Type_For_Product_Main" sourceRef="Task_Customer_Type_Main" targetRef="Task_Customer_Type_For_Product_Main" />
      <bpmn:sequenceFlow id="Flow_To_Call_Get_Next_Call_Id" sourceRef="Task_Customer_Type_For_Product_Main" targetRef="Call_Get_Next_Call_Id" />
      <bpmn:callActivity id="Call_ID_6_Checks" name="Call ID 6 checks" calledElement="Call_ID_6">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_6_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_6_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_6_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_6_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '6'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_6_Checks" sourceRef="Call_ID_6_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:callActivity id="Call_ID_7_Checks" name="Call ID 7 checks" calledElement="Call_ID_7">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_7_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_7_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_7_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_7_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '7'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_7_Checks" sourceRef="Call_ID_7_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:businessRuleTask id="Task_Customer_Type_For_Product_Main" name="Customer type for product output" camunda:resultVariable="customer_type_for_product" camunda:decisionRef="Decision_Table_Customer_type_For_Product" camunda:mapDecisionResult="singleEntry">
        <bpmn:incoming>Flow_To_Customer_Type_For_Product_Main</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Call_Get_Next_Call_Id</bpmn:outgoing>
      </bpmn:businessRuleTask>
      <bpmn:callActivity id="Call_ID_8_Checks" name="Call ID 8 checks" calledElement="Call_ID_8">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_8_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Send_Response_After_Call_ID_8_Checks</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Call_ID_8_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_8_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '8'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_To_Send_Response_After_Call_ID_8_Checks" sourceRef="Call_ID_8_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:callActivity id="Call_IsPhantomProcess_From_MainProcess" name="Is phantom flag" calledElement="IsPhantomProcess">
        <bpmn:extensionElements>
          <camunda:in variables="all" />
          <camunda:out variables="all" />
          <camunda:in businessKey="#{execution.processBusinessKey}" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Customer_Type_Main1</bpmn:incoming>
        <bpmn:outgoing>Flow_To_Customer_Type_Main</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:sequenceFlow id="Flow_To_Customer_Type_Main" sourceRef="Call_IsPhantomProcess_From_MainProcess" targetRef="Task_Customer_Type_Main" />
      <bpmn:sequenceFlow id="Flow_To_Call_ID_9_Checks" sourceRef="Gateaway_For_Next_Call_Id_Selection" targetRef="Call_ID_9_Checks">
        <bpmn:conditionExpression xsi:type="bpmn:tFormalExpression">{GetNextCall == '9'}</bpmn:conditionExpression>
      </bpmn:sequenceFlow>
      <bpmn:sequenceFlow id="Flow_0vp0zzp" sourceRef="Call_ID_9_Checks" targetRef="Task_Send_Response_After_Call_Id" />
      <bpmn:callActivity id="Call_ID_9_Checks" name="Call ID 9 checks" calledElement="Call_ID_9">
        <bpmn:extensionElements>
          <camunda:in businessKey="#{execution.processBusinessKey}" />
          <camunda:in variables="all" />
          <camunda:out variables="all" />
        </bpmn:extensionElements>
        <bpmn:incoming>Flow_To_Call_ID_9_Checks</bpmn:incoming>
        <bpmn:outgoing>Flow_0vp0zzp</bpmn:outgoing>
      </bpmn:callActivity>
      <bpmn:textAnnotation id="TextAnnotation_03myymm">
        <bpmn:text>Send response to orchestrator queue</bpmn:text>
      </bpmn:textAnnotation>
      <bpmn:association id="Association_1318rb2" sourceRef="Task_Send_Response_After_Call_Id" targetRef="TextAnnotation_03myymm" />
      <bpmn:textAnnotation id="TextAnnotation_0unyo39">
        <bpmn:text>Calculates next call id value</bpmn:text>
      </bpmn:textAnnotation>
      <bpmn:association id="Association_083x7zu" sourceRef="Call_Get_Next_Call_Id" targetRef="TextAnnotation_0unyo39" />
    </bpmn:subProcess>
    <bpmn:startEvent id="StartEvent_Main_Process">
      <bpmn:outgoing>SequenceFlow_From_Main_To_Call_ID_Process</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="SequenceFlow_From_Main_To_Call_ID_Process" sourceRef="StartEvent_Main_Process" targetRef="Task_Call_ID_3" />
    <bpmn:endEvent id="EndEvent_Main_Process">
      <bpmn:incoming>SequenceFlow_To_End_Main_Process</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="SequenceFlow_To_End_Main_Process" sourceRef="Task_Call_ID_3" targetRef="EndEvent_Main_Process" />
    <bpmn:textAnnotation id="TextAnnotation_1q86c92">
      <bpmn:text>Main process</bpmn:text>
    </bpmn:textAnnotation>
    <bpmn:association id="Association_1h5y2r0" sourceRef="Task_Call_ID_3" targetRef="TextAnnotation_1q86c92" />
  </bpmn:process>
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_Test_Strategy">
      <bpmndi:BPMNEdge id="SequenceFlow_1u1v1rc_di" bpmnElement="SequenceFlow_To_End_Main_Process">
        <di:waypoint x="750" y="1410" />
        <di:waypoint x="750" y="1502" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="SequenceFlow_0c59s0y_di" bpmnElement="SequenceFlow_From_Main_To_Call_ID_Process">
        <di:waypoint x="840" y="118" />
        <di:waypoint x="840" y="270" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="StartEvent_0mtgpm5_di" bpmnElement="StartEvent_Main_Process">
        <dc:Bounds x="822" y="82" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="SubProcess_19l17uu_di" bpmnElement="Task_Call_ID_3" isExpanded="true">
        <dc:Bounds x="200" y="270" width="980" height="1140" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_0unyo39_di" bpmnElement="TextAnnotation_0unyo39">
        <dc:Bounds x="690" y="730" width="170" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_03myymm_di" bpmnElement="TextAnnotation_03myymm">
        <dc:Bounds x="420" y="1290" width="230" height="30" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_1vqat6y_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_8_Checks">
        <di:waypoint x="950" y="1090" />
        <di:waypoint x="950" y="1230" />
        <di:waypoint x="720" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1aqgcx7_di" bpmnElement="Flow_To_Call_ID_8_Checks">
        <di:waypoint x="695" y="930" />
        <di:waypoint x="950" y="930" />
        <di:waypoint x="950" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1pcjdqr_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_7_Checks">
        <di:waypoint x="840" y="1090" />
        <di:waypoint x="840" y="1230" />
        <di:waypoint x="720" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0099mza_di" bpmnElement="Flow_To_Call_ID_7_Checks">
        <di:waypoint x="695" y="930" />
        <di:waypoint x="840" y="930" />
        <di:waypoint x="840" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0ul4z54_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_6_Checks">
        <di:waypoint x="730" y="1090" />
        <di:waypoint x="730" y="1140" />
        <di:waypoint x="670" y="1140" />
        <di:waypoint x="670" y="1190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1kfp9si_di" bpmnElement="Flow_To_Call_ID_6_Checks">
        <di:waypoint x="695" y="930" />
        <di:waypoint x="730" y="930" />
        <di:waypoint x="730" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1ihxe1g_di" bpmnElement="Flow_To_Call_Get_Next_Call_Id">
        <di:waypoint x="670" y="720" />
        <di:waypoint x="670" y="760" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0xdiy19_di" bpmnElement="Flow_To_Customer_Type_For_Product_Main">
        <di:waypoint x="670" y="600" />
        <di:waypoint x="670" y="640" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_18gyxsv_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_5_Checks">
        <di:waypoint x="610" y="1090" />
        <di:waypoint x="610" y="1140" />
        <di:waypoint x="670" y="1140" />
        <di:waypoint x="670" y="1190" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1eupmgw_di" bpmnElement="Flow_To_Call_ID_5_Checks">
        <di:waypoint x="645" y="930" />
        <di:waypoint x="610" y="930" />
        <di:waypoint x="610" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1pj4zuw_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_4_Checks">
        <di:waypoint x="500" y="1090" />
        <di:waypoint x="500" y="1230" />
        <di:waypoint x="620" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_06admts_di" bpmnElement="Flow_To_Call_ID_4_Checks">
        <di:waypoint x="645" y="930" />
        <di:waypoint x="500" y="930" />
        <di:waypoint x="500" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0y3nbiz_di" bpmnElement="Flow_To_EndEvent_Call_ID_Main_Process_After_Send_Response">
        <di:waypoint x="670" y="1270" />
        <di:waypoint x="670" y="1322" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_12ulb9h_di" bpmnElement="DefaultFlow_After_Gateaway_For_Next_Call_Id_Selection">
        <di:waypoint x="695" y="930" />
        <di:waypoint x="1140" y="930" />
        <di:waypoint x="1140" y="1340" />
        <di:waypoint x="688" y="1340" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1xl6oen_di" bpmnElement="Flow_To_Gateaway_For_Next_Call_Id_Selection">
        <di:waypoint x="670" y="840" />
        <di:waypoint x="670" y="905" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0gibyhp_di" bpmnElement="Flow_To_Call_ID_3_Checks">
        <di:waypoint x="645" y="930" />
        <di:waypoint x="390" y="930" />
        <di:waypoint x="390" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNLabel bpmnElement="Flow_To_Call_ID_3_Checks">
      </bpmndi:BPMNLabel>
      <bpmndi:BPMNEdge id="Flow_02532md_di" bpmnElement="Flow_To_Call_ID_1_Checks">
        <di:waypoint x="645" y="930" />
        <di:waypoint x="280" y="930" />
        <di:waypoint x="280" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1e97fqf_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_1_Checks">
        <di:waypoint x="280" y="1090" />
        <di:waypoint x="280" y="1230" />
        <di:waypoint x="620" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0j5lpcd_di" bpmnElement="Flow_To_Send_Response_After_Call_ID_3_Checks">
        <di:waypoint x="390" y="1090" />
        <di:waypoint x="390" y="1230" />
        <di:waypoint x="620" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wuk4vz_di" bpmnElement="Flow_To_Call_ID_9_Checks">
        <di:waypoint x="695" y="930" />
        <di:waypoint x="1060" y="930" />
        <di:waypoint x="1060" y="1010" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0vp0zzp_di" bpmnElement="Flow_0vp0zzp">
        <di:waypoint x="1060" y="1090" />
        <di:waypoint x="1060" y="1230" />
        <di:waypoint x="720" y="1230" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0pae7le_di" bpmnElement="Flow_To_Customer_Type_Main">
        <di:waypoint x="670" y="460" />
        <di:waypoint x="670" y="520" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1oacnkn_di" bpmnElement="Flow_To_Customer_Type_Main1">
        <di:waypoint x="670" y="328" />
        <di:waypoint x="670" y="380" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Activity_1uumg2f_di" bpmnElement="Call_ID_1_Checks">
        <dc:Bounds x="230" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_19vjibz_di" bpmnElement="Call_ID_3_Checks">
        <dc:Bounds x="340" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ry0vfn_di" bpmnElement="Call_ID_4_Checks">
        <dc:Bounds x="450" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1gtcwfa_di" bpmnElement="Call_ID_5_Checks">
        <dc:Bounds x="560" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_1ibxgob_di" bpmnElement="Call_ID_6_Checks">
        <dc:Bounds x="680" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Gateway_0aa53zb_di" bpmnElement="Gateaway_For_Next_Call_Id_Selection" isMarkerVisible="true">
        <dc:Bounds x="645" y="905" width="50" height="50" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0i9lm0x_di" bpmnElement="Call_Get_Next_Call_Id">
        <dc:Bounds x="620" y="760" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0mrmxvg_di" bpmnElement="Call_ID_7_Checks">
        <dc:Bounds x="790" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0yiz70a_di" bpmnElement="Call_ID_8_Checks">
        <dc:Bounds x="900" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0cbp062_di" bpmnElement="Call_ID_9_Checks">
        <dc:Bounds x="1010" y="1010" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0uw4wez_di" bpmnElement="Task_Send_Response_After_Call_Id">
        <dc:Bounds x="620" y="1190" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="EndEvent_00crsp0_di" bpmnElement="EndEvent_Call_ID_Main_Process">
        <dc:Bounds x="652" y="1322" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_00xikhs_di" bpmnElement="Task_Customer_Type_For_Product_Main">
        <dc:Bounds x="620" y="640" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_08smlbg_di" bpmnElement="Task_Customer_Type_Main">
        <dc:Bounds x="620" y="520" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0ikgneb_di" bpmnElement="Call_IsPhantomProcess_From_MainProcess">
        <dc:Bounds x="620" y="380" width="100" height="80" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="StartEvent_1qvyam6_di" bpmnElement="StartEvent_Call_ID_Main_Process">
        <dc:Bounds x="652" y="292" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_083x7zu_di" bpmnElement="Association_083x7zu">
        <di:waypoint x="720" y="774" />
        <di:waypoint x="746" y="760" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Association_1318rb2_di" bpmnElement="Association_1318rb2">
        <di:waypoint x="620" y="1255" />
        <di:waypoint x="559" y="1290" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="EndEvent_17n1fvm_di" bpmnElement="EndEvent_Main_Process">
        <dc:Bounds x="732" y="1502" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="TextAnnotation_1q86c92_di" bpmnElement="TextAnnotation_1q86c92">
        <dc:Bounds x="880" y="100" width="100" height="33" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Association_1h5y2r0_di" bpmnElement="Association_1h5y2r0">
        <di:waypoint x="900" y="270" />
        <di:waypoint x="919" y="133" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>`;

export default function testXML(){
  return testXml;
};