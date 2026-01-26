#!/usr/bin/env node

/**
 * Domotz MCP Server
 * Complete implementation with all 130 API endpoints
 * Auto-generated from OpenAPI spec
 */

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import axios from 'axios';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const API_KEY = process.env.DOMOTZ_API_KEY;
const API_BASE_URL = process.env.DOMOTZ_API_BASE_URL || 'https://api-us-east-1-cell-1.domotz.com/public-api/v1';

if (!API_KEY) {
  console.error('ERROR: DOMOTZ_API_KEY environment variable is required');
  process.exit(1);
}

// Create axios instance with default config
const domotzApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'X-Api-Key': API_KEY,
    'Content-Type': 'application/json'
  }
});

// Helper function to handle API errors
function handleApiError(error) {
  if (error.response) {
    return {
      error: true,
      status: error.response.status,
      message: error.response.data?.message || error.message,
      data: error.response.data
    };
  }
  return {
    error: true,
    message: error.message
  };
}

// Create MCP server
const server = new Server(
  {
    name: 'domotz-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Define all 130 tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
          {
                "name": "list_agents",
                "description": "Returns the collectors list.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 100. Default value is 10"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "display_name": {
                                  "type": "string",
                                  "description": "Consider only collectors with `display_name` containing the string (case insensitive)"
                            },
                            "team_name": {
                                  "type": "string",
                                  "description": "Filters by team name (companies only)"
                            }
                      }
                }
          },
          {
                "name": "count_agents",
                "description": "Counts the collectors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "display_name": {
                                  "type": "string",
                                  "description": "Consider only collectors with `display_name` containing the string (case insensitive)"
                            },
                            "team_name": {
                                  "type": "string",
                                  "description": "Filters by team name (companies only)"
                            }
                      }
                }
          },
          {
                "name": "get_agent",
                "description": "Returns the details of a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_agent",
                "description": "Deletes a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_activity_log",
                "description": "Returns the activity log of a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            },
                            "type": {
                                  "type": "string",
                                  "description": "If present, only the specified type(s) will be fetched."
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_connection_consumption",
                "description": "Returns the remote connection consumption on the given collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_v_p_n_active_connections",
                "description": "Returns the active VPN connections for the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "create_agent_v_p_n_connection",
                "description": "Creates a temporary VPN server on the collector and returns the vpn configuration file content. Current consumption and consumption limits can be retrieved with a call to <a href='#getconnectionconsumption'> getConnectionConsumption</a> endpoint.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_agent_v_p_n_connection",
                "description": "Closes an active VPN connection session for the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "vpn_session_id": {
                                  "type": "integer",
                                  "description": "Vpn Session Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "vpn_session_id"
                      ]
                }
          },
          {
                "name": "list_devices",
                "description": "Returns all the devices of a collector. On per-device licensing collectors, only the managed devices are included.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "show_hidden": {
                                  "type": "boolean",
                                  "description": "Whether to include hidden devices in the returned list"
                            },
                            "show_excluded": {
                                  "type": "boolean",
                                  "description": "Whether to include excluded devices in the returned list. Default is True"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_down_devices",
                "description": "Deletes all the DOWN devices of *IP* protocol.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_device",
                "description": "Returns the details of a device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "delete_device",
                "description": "Deletes a device, whether ONLINE, OFFLINE or DOWN. If a device is deleted while online, it may reappear when rediscovered automatically.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "edit_device",
                "description": "Changes a proprety of the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "field": {
                                  "type": "string",
                                  "description": "Field"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "field"
                      ]
                }
          },
          {
                "name": "get_device_power_actions",
                "description": "Returns the power management actions available on the device at the current moment. See <a href='#schemadevicepoweraction'> DevicePowerAction </a> schema for further details.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "power_action_on_device",
                "description": "Performs the action on the device, according to the specified {<b> field </b>} value. The availability of such operations can be determined with a call to <a href='#getdevicepoweractions'> getDevicePowerActions </a>  operation.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "field": {
                                  "type": "string",
                                  "description": "Field"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "field"
                      ]
                }
          },
          {
                "name": "list_device_applications",
                "description": "Returns the list of applications of the device. The feature is only available on collectors under the Enterprise Plan.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 1000. Default value is 100"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "name": {
                                  "type": "string",
                                  "description": "Allows filtering by `name`"
                            },
                            "device_ids": {
                                  "type": "string",
                                  "description": "Allows filtering by `device_ids`"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "count_device_applications",
                "description": "Counts the applications. The feature is only available on collectors under the Enterprise Plan.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "name": {
                                  "type": "string",
                                  "description": "Allows filtering by `name`"
                            },
                            "device_ids": {
                                  "type": "string",
                                  "description": "Allows filtering by `device_ids`"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "backup_device_configuration",
                "description": "Sends a command to backup a device configuration.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "device_configuration_history_list",
                "description": "Returns the list of available device configurations.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "create_device_configuration",
                "description": "Creates a device configuration backup in the configuration history.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_device_configuration",
                "description": "Returns the details of a device configuration entry.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "configuration_timestamp": {
                                  "type": "string",
                                  "description": "Configuration Timestamp"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "configuration_timestamp"
                      ]
                }
          },
          {
                "name": "connect_to_device",
                "description": "Establishes a direct secure connection to the `device`. Current consumption and consumption limits can be retrieved with a call to <a href='#getconnectionconsumption'> getConnectionConsumption</a> endpoint.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "set_credentials",
                "description": "Sets the device credentials to perform extended discovery. This operation will affect the <b> authentication_status </b> of the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "create_device_custom_tag_binding",
                "description": "Associates a custom tag to a device",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "custom_tag_id": {
                                  "type": "integer",
                                  "description": "Custom Tag Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "custom_tag_id"
                      ]
                }
          },
          {
                "name": "delete_device_custom_tag_binding",
                "description": "Disassociates a custom tag to a device",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "custom_tag_id": {
                                  "type": "integer",
                                  "description": "Custom Tag Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "custom_tag_id"
                      ]
                }
          },
          {
                "name": "get_device_custom_tag_bindings",
                "description": "Retrieves all the user's custom tags associated to a device",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "list_eyes_s_n_m_p",
                "description": "Returns the list of configured SNMP sensors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "create_eye_s_n_m_p",
                "description": "Creates a new SNMP sensors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "delete_eye_s_n_m_p",
                "description": "Deletes the SNMP sensor.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id"
                      ]
                }
          },
          {
                "name": "list_eyes_s_n_m_p_trigger_function",
                "description": "Returns the list of functions for the SNMP sensor trigger.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id"
                      ]
                }
          },
          {
                "name": "get_eyes_s_n_m_p_history",
                "description": "Returns the time series of the SNMP sensor collected samples.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id"
                      ]
                }
          },
          {
                "name": "list_eyes_s_n_m_p_trigger",
                "description": "Returns the list of triggers for the SNMP Sensor.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id"
                      ]
                }
          },
          {
                "name": "create_eye_s_n_m_p_trigger",
                "description": "Creates a new SNMP Trigger for the sensor. \n\nFor instance, to receive a notification when the value of the sensor is above a threshold x, it is required to add a trigger specifying the function_id = 2 (is greater than) and the operand value equals to [x]. \nThe function_id value can be retrieved with the listEyesSNMPTriggerFunction call. \nTo activate the alert, it is required to call createEyeSNMPTriggerAlert after the trigger creation.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id"
                      ]
                }
          },
          {
                "name": "delete_eye_s_n_m_p_trigger",
                "description": "Deletes the SNMP Trigger for the sensor.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            },
                            "trigger_id": {
                                  "type": "integer",
                                  "description": "Trigger Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id",
                            "trigger_id"
                      ]
                }
          },
          {
                "name": "create_eye_s_n_m_p_trigger_alert",
                "description": "Add an alert to a SNMP Trigger.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            },
                            "trigger_id": {
                                  "type": "integer",
                                  "description": "Trigger Id"
                            },
                            "medium_name": {
                                  "type": "string",
                                  "description": "Medium Name"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id",
                            "trigger_id",
                            "medium_name"
                      ]
                }
          },
          {
                "name": "delete_eye_s_n_m_p_trigger_alert",
                "description": "Deletes the alert for thee SNMP Trigger.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "sensor_id": {
                                  "type": "integer",
                                  "description": "Sensor Id"
                            },
                            "trigger_id": {
                                  "type": "integer",
                                  "description": "Trigger Id"
                            },
                            "medium_name": {
                                  "type": "string",
                                  "description": "Medium Name"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "sensor_id",
                            "trigger_id",
                            "medium_name"
                      ]
                }
          },
          {
                "name": "list_eyes_t_c_p",
                "description": "Returns the list of configured TCP sensors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "create_eye_t_c_p",
                "description": "Creates a new TCP sensors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "delete_eye_t_c_p",
                "description": "Deletes the TCP sensor.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "service_id": {
                                  "type": "integer",
                                  "description": "Service Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "service_id"
                      ]
                }
          },
          {
                "name": "get_device_status_history",
                "description": "Returns the time series of the state changes of the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_device_r_t_d_history",
                "description": "Returns the Round Trip Delay history for the device. Each item represents the statistical aggregate of a set of Round Trip Delay measurements.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_device_inventory",
                "description": "Returns the device's inventory data.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "set_device_inventory_field_value",
                "description": "Sets the value of an Inventory field for the device, a value can't be set to `null`.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "inventory_field": {
                                  "type": "string",
                                  "description": "Inventory Field"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "inventory_field"
                      ]
                }
          },
          {
                "name": "delete_device_inventory_field",
                "description": "Deletes the Inventory field for the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "inventory_field": {
                                  "type": "string",
                                  "description": "Inventory Field"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "inventory_field"
                      ]
                }
          },
          {
                "name": "update_device_monitoring_state",
                "description": "Sets the monitoring state of a device to either managed or unmanaged. This endpoint is available only for agents using per-device licensing.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "onvif_snapshot",
                "description": "Take a snapshot of the camera. Internally, a device connection is established. Current consumption and consumption limits can be retrieved with a call to <a href='#getconnectionconsumption'> getConnectionConsumption</a> endpoint.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_device_outlets",
                "description": "Returns a list of the power outlets discovered on the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "update_device_outlet",
                "description": "Update the power outlet with the specified custom name.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "power_outlet_id": {
                                  "type": "integer",
                                  "description": "Power Outlet Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "power_outlet_id"
                      ]
                }
          },
          {
                "name": "trigger_outlet_action",
                "description": "Trigger an action on a power outlet.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "power_outlet_id": {
                                  "type": "integer",
                                  "description": "Power Outlet Id"
                            },
                            "action": {
                                  "type": "string",
                                  "description": "Action"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "power_outlet_id",
                            "action"
                      ]
                }
          },
          {
                "name": "attach_device_to_outlet",
                "description": "Attach a device to a power outlet.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "power_outlet_id": {
                                  "type": "integer",
                                  "description": "Power Outlet Id"
                            },
                            "attached_device_id": {
                                  "type": "integer",
                                  "description": "Attached Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "power_outlet_id",
                            "attached_device_id"
                      ]
                }
          },
          {
                "name": "detach_device_from_outlet",
                "description": "Detach a device from a power outlet.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "power_outlet_id": {
                                  "type": "integer",
                                  "description": "Power Outlet Id"
                            },
                            "attached_device_id": {
                                  "type": "integer",
                                  "description": "Attached Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "power_outlet_id",
                            "attached_device_id"
                      ]
                }
          },
          {
                "name": "get_s_n_m_p_authentication",
                "description": "Returns the SNMP authentication info.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "set_s_n_m_p_authentication",
                "description": "Sets the SNMP authentication info. <ul><li>_snmp_read_community_ and _snmp_write_community_ are  relevant only for _V1_ and _V2_. </li><li>_V3_NO_AUTH_ requires a valid _username_. </li><li>_V3_AUTH_NO_PRIV_ requires _username_, _authentication_protocol_ and _authentication_key_. </li><li>_V3_AUTH_PRIV_ requires _username_, _authentication_protocol_, _authentication_key_, _encryption_protocol_ and _encryption_key_.</li></ul>",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "set_snmp_community",
                "description": "Saves a snmp community (read, optionally write) on device. _Deprecated_, please use <a href='#setsnmpauthentication'> setSNMPAuthentication </a>.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_device_uptime",
                "description": "Returns the uptime of the device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "list_device_variables",
                "description": "Returns the list of device variables.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 1000. Default value is 100"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "sort_by": {
                                  "type": "string",
                                  "description": "Allows ordering by `path`, `id`, `value`, `label`, `value_update_time`, `creation_time`"
                            },
                            "sorting_direction": {
                                  "type": "string",
                                  "description": "The default is `asc`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "count_device_variables",
                "description": "Returns device variables count.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_variable_history",
                "description": "Returns the device variable history.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "variable_id": {
                                  "type": "integer",
                                  "description": "Variable Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id",
                            "variable_id"
                      ]
                }
          },
          {
                "name": "hide_device",
                "description": "Hides a device (available only on DOWN devices).",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "list_agent_device_applications",
                "description": "Returns the list of applications of all the devices belonging to the collector. The feature is only available on collectors under the Enterprise Plan.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 1000. Default value is 100"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "name": {
                                  "type": "string",
                                  "description": "Allows filtering by `name`"
                            },
                            "device_ids": {
                                  "type": "string",
                                  "description": "Allows filtering by `device_ids`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "count_agent_device_applications",
                "description": "Counts the applications of all devices belonging to the collector. The feature is only available on collectors under the Enterprise Plan.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "name": {
                                  "type": "string",
                                  "description": "Allows filtering by `name`"
                            },
                            "device_ids": {
                                  "type": "string",
                                  "description": "Allows filtering by `device_ids`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "create_external_host",
                "description": "Creates an external host.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_agent_eyes_s_n_m_p",
                "description": "Returns the list of configured SNMP sensors on the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_agent_eyes_t_c_p",
                "description": "Returns the list of configured TCP sensors on the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_unmanaged_devices",
                "description": "Returns the list of unmanaged devices for a specific collector. This endpoint returns a limited set of data to support per-device licensing flows. The list of managed devices can be retrieved using the listDevices API.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_r_t_d_stats",
                "description": "Returns the Round Trip Delay statistics for all devices monitored by the collector. The aggregate values of _avg_min_, _avg_max_, _avg_median_ help to understand the baseline response time of a device in a weekly time frame, while _latest_median_ helps detecting a possible deviation from the baseline.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_agent_device_variables",
                "description": "Returns the list of all device variables of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 1000. Default value is 100"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "sort_by": {
                                  "type": "string",
                                  "description": "Allows ordering by `path`, `id`, `value`, `label`, `value_update_time`, `creation_time`, `device_id`"
                            },
                            "sorting_direction": {
                                  "type": "string",
                                  "description": "The default is `asc`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "count_agent_device_variables",
                "description": "Returns the device variables count of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "eyes_usage_info",
                "description": "Returns information about Domotz Sensors usage and limits.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_status_history",
                "description": "Returns the time series of the state changes of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_speed_test_history",
                "description": "Returns the time series of the Internet Speed measurements taken from the collector, both in\ndownload and in upload.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_i_p_conflicts",
                "description": "Returns the list of active IP conflicts on a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "metric_usage_info",
                "description": "Returns Domotz Sensors usage and limits.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_network_topology",
                "description": "Returns the collector's network topology.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "set_d_h_c_p_device_discovery",
                "description": "Enable/disable the collector DHCP Device Discovery.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_excluded_devices",
                "description": "Returns all the excluded devices of a collector, i.e., devices present in Device Blacklist section.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "add_excluded_device",
                "description": "Excludes a device from collector monitoring.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "delete_excluded_device",
                "description": "Removes a device from the excluded devices list.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "set_agent_external_host_scan_policy",
                "description": "Updates the current external host scan policy. It is possible to enable/disable each one of the three available methods (ICMP, TCP-SYN, TCP-ACK). For TCP-SYN and TCP-ACK is mandatory to specify a set of TCP ports. If a method is not specified in the payload of the request, it will be configured as disabled.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_external_host_scan_policy",
                "description": "Returns the current external host scan policy.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_agent_external_host_scan_policy",
                "description": "Restore the external host scan policy to default.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_interfaces",
                "description": "Returns the networks monitored by the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "set_agent_interfaces_policy",
                "description": "Updates the current network interface filtering policy.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_interfaces_policy",
                "description": "Returns the current network interface filtering policy. The interfaces policy defines the set of interfaces which will be ignored (`deny`) or scanned (`allow`) by the collector. The default behavior is to scan all available interfaces.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_agent_interfaces_policy",
                "description": "Resets the network interface filtering policy to the default value.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "set_agent_i_p_scan_policy",
                "description": "Updates the current IP address scan policy. The list of IP addresses provided in `forced_ip_addresses` and the list of IP address ranges provided in `forced_ip_ranges` will be scanned regardless of the automatic discovery settings of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_i_p_scan_policy",
                "description": "Returns the current IP addresses management policy. It is possible to specify a set of IP addresses in the `forced_ip_addresses` field array or a set of IP address ranges in the `forced_ip_ranges` field array to be always scanned.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "delete_agent_i_p_scan_policy",
                "description": "Resets the IP scan policy to the default value.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "create_routed_network",
                "description": "Creates a routed network.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "move_agent",
                "description": "Moves a collector under the control of a different team. Note: This API is restricted to users on the Enterprise Plan. Please contact <a href=\"mailto:sales@domotz.com\">sales@domotz.com</a> to learn more.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "team_id": {
                                  "type": "integer",
                                  "description": "Team Id"
                            }
                      },
                      "required": [
                            "agent_id",
                            "team_id"
                      ]
                }
          },
          {
                "name": "get_agent_uptime",
                "description": "Returns the uptime of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_agent_variables",
                "description": "Returns the list of all collector variables of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "page_size": {
                                  "type": "number",
                                  "description": "The maximum number of items to return. Min value is 1. Max value is 1000. Default value is 100"
                            },
                            "page_number": {
                                  "type": "number",
                                  "description": "The requested page number, 0-indexed. Default value is 0"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "sort_by": {
                                  "type": "string",
                                  "description": "Allows ordering by `path`, `id`, `value`, `label`, `value_update_time`, `creation_time`"
                            },
                            "sorting_direction": {
                                  "type": "string",
                                  "description": "The default is `asc`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "count_agent_variables",
                "description": "Returns the collector variables count of the collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "value": {
                                  "type": "string",
                                  "description": "Allows filtering by `value`"
                            },
                            "path": {
                                  "type": "string",
                                  "description": "Allows filtering by `path`"
                            },
                            "has_history": {
                                  "type": "boolean",
                                  "description": "Allows filtering by `has_history` field"
                            },
                            "metric": {
                                  "type": "string",
                                  "description": "Allows filtering by `metric`"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_agent_variable_history",
                "description": "Returns the collector variable history.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "variable_id": {
                                  "type": "integer",
                                  "description": "Variable Id"
                            },
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      },
                      "required": [
                            "agent_id",
                            "variable_id"
                      ]
                }
          },
          {
                "name": "get_agent_list_uptime",
                "description": "Returns the uptime of all collectors.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "from": {
                                  "type": "string",
                                  "description": "The start time of the time series. Default value is one week"
                            },
                            "to": {
                                  "type": "string",
                                  "description": "The end time of the time series. Default value is now"
                            }
                      }
                }
          },
          {
                "name": "get_alert_profiles2",
                "description": "Returns the list of configured alert profiles. You can configure alert profiles on the Domotz Portal. Alert profiles define the association between a list of events and a notification channel (email, webhook or slack).",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "bind_alert_profile_to_agent",
                "description": "Bind an alert profile to a collector. After binding, a webhook will be sent to the configured service when one of the events associated to the profile occurs. You can configure the profile and the webhook endpoint on the Domotz Portal",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "alert_profile_id": {
                                  "type": "integer",
                                  "description": "Alert Profile Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "alert_profile_id",
                            "agent_id"
                      ]
                }
          },
          {
                "name": "unbind_alert_profile_from_agent",
                "description": "Unbind an alert profile from a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "alert_profile_id": {
                                  "type": "integer",
                                  "description": "Alert Profile Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "alert_profile_id",
                            "agent_id"
                      ]
                }
          },
          {
                "name": "bind_alert_profile_to_device",
                "description": "Bind an alert profile to a device. After binding, a webhook will be sent to the configured service when one of the events associated to the profile occurs. You can configure the profile and the webhook endpoint on the Domotz Portal",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "alert_profile_id": {
                                  "type": "integer",
                                  "description": "Alert Profile Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "alert_profile_id",
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "unbind_alert_profile_from_device",
                "description": "Unbind an alert profile from a device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "alert_profile_id": {
                                  "type": "integer",
                                  "description": "Alert Profile Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            }
                      },
                      "required": [
                            "alert_profile_id",
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "get_agent_alert_profile",
                "description": "Returns the alert profile bindings of a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "get_devices_alert_profile",
                "description": "Returns the alert profile bindings of the devices of a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "list_areas",
                "description": "Returns all the areas of a Company. Note: This API is restricted to users on the Enterprise Plan. Please contact <a href=\"mailto:sales@domotz.com\">sales@domotz.com</a> to learn more.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "list_teams",
                "description": "Returns all the teams of an Area. Note: This API is restricted to users on the Enterprise Plan. Please contact <a href=\"mailto:sales@domotz.com\">sales@domotz.com</a> to learn more.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "area_id": {
                                  "type": "integer",
                                  "description": "Area Id"
                            }
                      },
                      "required": [
                            "area_id"
                      ]
                }
          },
          {
                "name": "create_team",
                "description": "Creates a new Team. Note: This API is restricted to users on the Enterprise Plan. Please contact <a href=\"mailto:sales@domotz.com\">sales@domotz.com</a> to learn more.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "area_id": {
                                  "type": "integer",
                                  "description": "Area Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "area_id"
                      ]
                }
          },
          {
                "name": "list_custom_drivers",
                "description": "Retrieves the list of available Custom Drivers.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "get_custom_driver",
                "description": "Returns details of a Custom Driver.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_driver_id": {
                                  "type": "integer",
                                  "description": "Custom Driver Id"
                            }
                      },
                      "required": [
                            "custom_driver_id"
                      ]
                }
          },
          {
                "name": "create_custom_driver_association",
                "description": "Apply a Custom Driver to a device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_driver_id": {
                                  "type": "integer",
                                  "description": "Custom Driver Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "custom_driver_id",
                            "agent_id",
                            "device_id"
                      ]
                }
          },
          {
                "name": "execute_custom_driver_action",
                "description": "Execute a Custom Driver action on an associated device. The collector variables limit for Custom Drivers must not be exceeded.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_driver_id": {
                                  "type": "integer",
                                  "description": "Custom Driver Id"
                            },
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            },
                            "device_id": {
                                  "type": "integer",
                                  "description": "Device Id"
                            },
                            "action_id": {
                                  "type": "integer",
                                  "description": "Action Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "custom_driver_id",
                            "agent_id",
                            "device_id",
                            "action_id"
                      ]
                }
          },
          {
                "name": "delete_custom_driver_association",
                "description": "Remove a Custom Driver from a device. This irreversibly deletes all variables created by the driver for that device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_driver_id": {
                                  "type": "integer",
                                  "description": "Custom Driver Id"
                            },
                            "association_id": {
                                  "type": "integer",
                                  "description": "Association Id"
                            }
                      },
                      "required": [
                            "custom_driver_id",
                            "association_id"
                      ]
                }
          },
          {
                "name": "update_custom_driver_association_parameters",
                "description": "Update the parameters for a Custom Driver association.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_driver_id": {
                                  "type": "integer",
                                  "description": "Custom Driver Id"
                            },
                            "association_id": {
                                  "type": "integer",
                                  "description": "Association Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "custom_driver_id",
                            "association_id"
                      ]
                }
          },
          {
                "name": "list_custom_driver_associations",
                "description": "Retrieves a list of all Custom Driver associations for a collector.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "agent_id": {
                                  "type": "integer",
                                  "description": "Agent Id"
                            }
                      },
                      "required": [
                            "agent_id"
                      ]
                }
          },
          {
                "name": "re_enable_custom_driver_associations",
                "description": "Re-enable all disabled Custom Drivers for the current user.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "include_unrecoverable": {
                                  "type": "boolean",
                                  "description": "If true, will also re-enable associations that the system has determined unable to recover (e.g. due to missing credentials). Defaults to false."
                            }
                      }
                }
          },
          {
                "name": "get_custom_tags",
                "description": "Retrieves all the custom tags defined by the user",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "create_custom_tag",
                "description": "Creates a custom tag defined by the user",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      }
                }
          },
          {
                "name": "edit_custom_tag",
                "description": "Edits a custom tag defined by the user",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_tag_id": {
                                  "type": "integer",
                                  "description": "Custom Tag Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "custom_tag_id"
                      ]
                }
          },
          {
                "name": "delete_custom_tag",
                "description": "Deletes a custom tag defined by the user",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "custom_tag_id": {
                                  "type": "integer",
                                  "description": "Custom Tag Id"
                            }
                      },
                      "required": [
                            "custom_tag_id"
                      ]
                }
          },
          {
                "name": "list_device_profiles",
                "description": "Returns the list of the available device profiles.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "apply_device_profile",
                "description": "Applies a device profile to a set of devices.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "device_profile_id": {
                                  "type": "integer",
                                  "description": "Device Profile Id"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "device_profile_id"
                      ]
                }
          },
          {
                "name": "get_inventory",
                "description": "Enumerates all the Inventory fields.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "delete_inventory",
                "description": "Clears the inventory.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "create_inventory_field",
                "description": "Creates a new Inventory Field - the user will be able to set key-values pairs on every device.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "inventory_field": {
                                  "type": "string",
                                  "description": "Inventory Field"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "inventory_field"
                      ]
                }
          },
          {
                "name": "delete_inventory_field",
                "description": "Deletes the Inventory Field.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "inventory_field": {
                                  "type": "string",
                                  "description": "Inventory Field"
                            }
                      },
                      "required": [
                            "inventory_field"
                      ]
                }
          },
          {
                "name": "update_inventory_field",
                "description": "Updates the Inventory Field.",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "inventory_field": {
                                  "type": "string",
                                  "description": "Inventory Field"
                            },
                            "body": {
                                  "type": "object",
                                  "description": "Request body (JSON object)"
                            }
                      },
                      "required": [
                            "inventory_field"
                      ]
                }
          },
          {
                "name": "api_usage_info",
                "description": "Returns information about API usage and limits.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "list_device_base_types",
                "description": "Returns the device types list.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "list_device_detected_types",
                "description": "Returns the detected device types list.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "get_user",
                "description": "Returns the account information.",
                "inputSchema": {
                      "type": "object",
                      "properties": {}
                }
          },
          {
                "name": "get_alert_profiles_deprecated",
                "description": "Returns the list of configured alert profiles. You can configure alert profiles on the Domotz Portal. Alert profiles define the association between a list of events and a notification channel (email, webhook or slack).",
                "inputSchema": {
                      "type": "object",
                      "properties": {
                            "user_id": {
                                  "type": "integer",
                                  "description": "User Id"
                            }
                      },
                      "required": [
                            "user_id"
                      ]
                }
          }
    ]
  };
});

// Handle tool execution
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_agents': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.display_name !== undefined) params.display_name = args.display_name;
        if (args.team_name !== undefined) params.team_name = args.team_name;
        const response = await domotzApi.get(`/agent`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_agents': {
        const params = {};
        if (args.display_name !== undefined) params.display_name = args.display_name;
        if (args.team_name !== undefined) params.team_name = args.team_name;
        const response = await domotzApi.head(`/agent`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'get_agent': {
        const response = await domotzApi.get(`/agent/${args.agent_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_agent': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_activity_log': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        if (args.type !== undefined) params.type = args.type;
        const response = await domotzApi.get(`/agent/${args.agent_id}/activity-log`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_connection_consumption': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/connection/consumption`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_agent_v_p_n_active_connections': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/connection/vpn-session`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_agent_v_p_n_connection': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/connection/vpn-session`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_agent_v_p_n_connection': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/connection/vpn-session/${args.vpn_session_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_devices': {
        const params = {};
        if (args.show_hidden !== undefined) params.show_hidden = args.show_hidden;
        if (args.show_excluded !== undefined) params.show_excluded = args.show_excluded;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_down_devices': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_device': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'edit_device': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/${args.field}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device_power_actions': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/action/power`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'power_action_on_device': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/action/power/${args.field}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_device_applications': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.name !== undefined) params.name = args.name;
        if (args.device_ids !== undefined) params.device_ids = args.device_ids;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/application`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_device_applications': {
        const params = {};
        if (args.name !== undefined) params.name = args.name;
        if (args.device_ids !== undefined) params.device_ids = args.device_ids;
        const response = await domotzApi.head(`/agent/${args.agent_id}/device/${args.device_id}/application`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'backup_device_configuration': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/configuration-management/backup`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'device_configuration_history_list': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/configuration-management/history`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_device_configuration': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/configuration-management/history`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device_configuration': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/configuration-management/history/${args.configuration_timestamp}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'connect_to_device': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/connection`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'set_credentials': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/credentials`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'create_device_custom_tag_binding': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/custom-tag/${args.custom_tag_id}/binding`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_device_custom_tag_binding': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/custom-tag/${args.custom_tag_id}/binding`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device_custom_tag_bindings': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/custom-tag/binding`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_eyes_s_n_m_p': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_eye_s_n_m_p': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_eye_s_n_m_p': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_eyes_s_n_m_p_trigger_function': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/function`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_eyes_s_n_m_p_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/history`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_eyes_s_n_m_p_trigger': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/trigger`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_eye_s_n_m_p_trigger': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/trigger`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_eye_s_n_m_p_trigger': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/trigger/${args.trigger_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'create_eye_s_n_m_p_trigger_alert': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/trigger/${args.trigger_id}/alert/${args.medium_name}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_eye_s_n_m_p_trigger_alert': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/eye/snmp/${args.sensor_id}/trigger/${args.trigger_id}/alert/${args.medium_name}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_eyes_t_c_p': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/eye/tcp`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_eye_t_c_p': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/eye/tcp`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_eye_t_c_p': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/eye/tcp/${args.service_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device_status_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/history/network/event`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_device_r_t_d_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/history/rtd`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_device_inventory': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/inventory`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'set_device_inventory_field_value': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/inventory/${args.inventory_field}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_device_inventory_field': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/inventory/${args.inventory_field}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'update_device_monitoring_state': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/monitoring-state`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'onvif_snapshot': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/multimedia/camera/snapshot`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_device_outlets': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/power-outlet`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'update_device_outlet': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/power-outlet/${args.power_outlet_id}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'trigger_outlet_action': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/power-outlet/${args.power_outlet_id}/action/${args.action}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'attach_device_to_outlet': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/${args.device_id}/power-outlet/${args.power_outlet_id}/attach/${args.attached_device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'detach_device_from_outlet': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/power-outlet/${args.power_outlet_id}/attach/${args.attached_device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_s_n_m_p_authentication': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/snmp-authentication`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'set_s_n_m_p_authentication': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/snmp-authentication`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'set_snmp_community': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/device/${args.device_id}/snmp-community`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_device_uptime': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/uptime`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_device_variables': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.sort_by !== undefined) params.sort_by = args.sort_by;
        if (args.sorting_direction !== undefined) params.sorting_direction = args.sorting_direction;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_device_variables': {
        const params = {};
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.head(`/agent/${args.agent_id}/device/${args.device_id}/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'get_variable_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/${args.device_id}/variable/${args.variable_id}/history`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'hide_device': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/device/${args.device_id}/visibility`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_agent_device_applications': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.name !== undefined) params.name = args.name;
        if (args.device_ids !== undefined) params.device_ids = args.device_ids;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/application`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_agent_device_applications': {
        const params = {};
        if (args.name !== undefined) params.name = args.name;
        if (args.device_ids !== undefined) params.device_ids = args.device_ids;
        const response = await domotzApi.head(`/agent/${args.agent_id}/device/application`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'create_external_host': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/device/external-host`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_agent_eyes_s_n_m_p': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/eye/snmp`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_agent_eyes_t_c_p': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/eye/tcp`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_unmanaged_devices': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/monitoring-state/unmanaged`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_agent_r_t_d_stats': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/rtd`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_agent_device_variables': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.sort_by !== undefined) params.sort_by = args.sort_by;
        if (args.sorting_direction !== undefined) params.sorting_direction = args.sorting_direction;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.get(`/agent/${args.agent_id}/device/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_agent_device_variables': {
        const params = {};
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.head(`/agent/${args.agent_id}/device/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'eyes_usage_info': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/eye-statistics`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_agent_status_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/history/network/event`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_speed_test_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/history/network/speed`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_agent_i_p_conflicts': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/ip-conflict`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'metric_usage_info': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/metric-statistics`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_network_topology': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network-topology`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'set_d_h_c_p_device_discovery': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/network/dhcp-device-discovery`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_excluded_devices': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network/excluded-device`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'add_excluded_device': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/network/excluded-device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_excluded_device': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/network/excluded-device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'set_agent_external_host_scan_policy': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/network/external-host-scan-policy`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_external_host_scan_policy': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network/external-host-scan-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_agent_external_host_scan_policy': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/network/external-host-scan-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_interfaces': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network/interfaces`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'set_agent_interfaces_policy': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/network/interfaces-policy`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_interfaces_policy': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network/interfaces-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_agent_interfaces_policy': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/network/interfaces-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'set_agent_i_p_scan_policy': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/network/ip-scan-policy`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_i_p_scan_policy': {
        const response = await domotzApi.get(`/agent/${args.agent_id}/network/ip-scan-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_agent_i_p_scan_policy': {
        const response = await domotzApi.delete(`/agent/${args.agent_id}/network/ip-scan-policy`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'create_routed_network': {
        const response = await domotzApi.post(`/agent/${args.agent_id}/network/routed`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'move_agent': {
        const response = await domotzApi.put(`/agent/${args.agent_id}/ownership/team/${args.team_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_uptime': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/uptime`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_agent_variables': {
        const params = {};
        if (args.page_size !== undefined) params.page_size = args.page_size;
        if (args.page_number !== undefined) params.page_number = args.page_number;
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.sort_by !== undefined) params.sort_by = args.sort_by;
        if (args.sorting_direction !== undefined) params.sorting_direction = args.sorting_direction;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.get(`/agent/${args.agent_id}/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'count_agent_variables': {
        const params = {};
        if (args.value !== undefined) params.value = args.value;
        if (args.path !== undefined) params.path = args.path;
        if (args.has_history !== undefined) params.has_history = args.has_history;
        if (args.metric !== undefined) params.metric = args.metric;
        const response = await domotzApi.head(`/agent/${args.agent_id}/variable`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify({ count: parseInt(response.headers['x-entities-count'] || '0', 10) }, null, 2) }]
        };
      }

      case 'get_agent_variable_history': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/${args.agent_id}/variable/${args.variable_id}/history`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_agent_list_uptime': {
        const params = {};
        if (args.from !== undefined) params.from = args.from;
        if (args.to !== undefined) params.to = args.to;
        const response = await domotzApi.get(`/agent/uptime`, { params });
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_alert_profiles2': {
        const response = await domotzApi.get(`/alert-profile`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'bind_alert_profile_to_agent': {
        const response = await domotzApi.post(`/alert-profile/${args.alert_profile_id}/binding/agent/${args.agent_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'unbind_alert_profile_from_agent': {
        const response = await domotzApi.delete(`/alert-profile/${args.alert_profile_id}/binding/agent/${args.agent_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'bind_alert_profile_to_device': {
        const response = await domotzApi.post(`/alert-profile/${args.alert_profile_id}/binding/agent/${args.agent_id}/device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'unbind_alert_profile_from_device': {
        const response = await domotzApi.delete(`/alert-profile/${args.alert_profile_id}/binding/agent/${args.agent_id}/device/${args.device_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_agent_alert_profile': {
        const response = await domotzApi.get(`/alert-profile/binding/agent/${args.agent_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_devices_alert_profile': {
        const response = await domotzApi.get(`/alert-profile/binding/agent/${args.agent_id}/device`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_areas': {
        const response = await domotzApi.get(`/area`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_teams': {
        const response = await domotzApi.get(`/area/${args.area_id}/team`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_team': {
        const response = await domotzApi.post(`/area/${args.area_id}/team`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_custom_drivers': {
        const response = await domotzApi.get(`/custom-driver`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_custom_driver': {
        const response = await domotzApi.get(`/custom-driver/${args.custom_driver_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_custom_driver_association': {
        const response = await domotzApi.post(`/custom-driver/${args.custom_driver_id}/agent/${args.agent_id}/device/${args.device_id}/association`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'execute_custom_driver_action': {
        const response = await domotzApi.post(`/custom-driver/${args.custom_driver_id}/agent/${args.agent_id}/device/${args.device_id}/execute/${args.action_id}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_custom_driver_association': {
        const response = await domotzApi.delete(`/custom-driver/${args.custom_driver_id}/association/${args.association_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'update_custom_driver_association_parameters': {
        const response = await domotzApi.put(`/custom-driver/${args.custom_driver_id}/association/${args.association_id}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_custom_driver_associations': {
        const response = await domotzApi.get(`/custom-driver/agent/${args.agent_id}/association`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 're_enable_custom_driver_associations': {
        const params = {};
        if (args.include_unrecoverable !== undefined) params.include_unrecoverable = args.include_unrecoverable;
        const response = await domotzApi.post(`/custom-driver/association/re-enable`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_custom_tags': {
        const response = await domotzApi.get(`/custom-tag`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'create_custom_tag': {
        const response = await domotzApi.post(`/custom-tag`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'edit_custom_tag': {
        const response = await domotzApi.put(`/custom-tag/${args.custom_tag_id}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_custom_tag': {
        const response = await domotzApi.delete(`/custom-tag/${args.custom_tag_id}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'list_device_profiles': {
        const response = await domotzApi.get(`/device-profile`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'apply_device_profile': {
        const response = await domotzApi.post(`/device-profile/${args.device_profile_id}/apply`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'get_inventory': {
        const response = await domotzApi.get(`/inventory`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'delete_inventory': {
        const response = await domotzApi.delete(`/inventory`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'create_inventory_field': {
        const response = await domotzApi.post(`/inventory/${args.inventory_field}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'delete_inventory_field': {
        const response = await domotzApi.delete(`/inventory/${args.inventory_field}`);
        return {
          content: [{ type: 'text', text: JSON.stringify({ success: true, status: response.status }, null, 2) }]
        };
      }

      case 'update_inventory_field': {
        const response = await domotzApi.put(`/inventory/${args.inventory_field}`, args.body || {});
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data || { success: true, status: response.status }, null, 2) }]
        };
      }

      case 'api_usage_info': {
        const response = await domotzApi.get(`/meta/usage`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_device_base_types': {
        const response = await domotzApi.get(`/type/device/base`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'list_device_detected_types': {
        const response = await domotzApi.get(`/type/device/detected`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_user': {
        const response = await domotzApi.get(`/user`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      case 'get_alert_profiles_deprecated': {
        const response = await domotzApi.get(`/user/${args.user_id}/alert-profile`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data, null, 2) }]
        };
      }

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  } catch (error) {
    const errorInfo = handleApiError(error);
    return {
      content: [
        {
          type: 'text',
          text: JSON.stringify(errorInfo, null, 2)
        }
      ],
      isError: true
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Domotz MCP Server running on stdio with 130 tools');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
