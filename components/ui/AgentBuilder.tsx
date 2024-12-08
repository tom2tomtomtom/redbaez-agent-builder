import React, { useState } from 'react';
import { Settings, Brain, Play, Save, RefreshCw } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

const AgentBuilder = () => {
  const [agentConfig, setAgentConfig] = useState({
    name: '',
    description: '',
    capabilities: [],
    personality: '',
    goals: [],
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAgentConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCapabilityAdd = () => {
    setAgentConfig(prev => ({
      ...prev,
      capabilities: [...prev.capabilities, '']
    }));
  };

  const handleGoalAdd = () => {
    setAgentConfig(prev => ({
      ...prev,
      goals: [...prev.goals, '']
    }));
  };

  const handleArrayInputChange = (index, value, field) => {
    setAgentConfig(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return {
        ...prev,
        [field]: newArray
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">RedBaez Test Agent Builder</h1>
        <p className="text-gray-600">Create and customize your AI agents with ease</p>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Agent Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Agent Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={agentConfig.name}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  placeholder="Enter agent name..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={agentConfig.description}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Describe your agent's purpose..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capabilities
                </label>
                {agentConfig.capabilities.map((capability, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={capability}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'capabilities')}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter capability..."
                    />
                  </div>
                ))}
                <button
                  onClick={handleCapabilityAdd}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  + Add Capability
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personality
                </label>
                <textarea
                  name="personality"
                  value={agentConfig.personality}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md"
                  rows="3"
                  placeholder="Define your agent's personality..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Goals
                </label>
                {agentConfig.goals.map((goal, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={goal}
                      onChange={(e) => handleArrayInputChange(index, e.target.value, 'goals')}
                      className="w-full p-2 border rounded-md"
                      placeholder="Enter goal..."
                    />
                  </div>
                ))}
                <button
                  onClick={handleGoalAdd}
                  className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                >
                  + Add Goal
                </button>
              </div>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={() => setShowPreview(true)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  <Play className="w-4 h-4" />
                  Preview Agent
                </button>
                <button
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
                >
                  <Save className="w-4 h-4" />
                  Save Agent
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="w-5 h-5" />
              Agent Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showPreview ? (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold">{agentConfig.name || 'Unnamed Agent'}</h3>
                  <p className="text-gray-600">{agentConfig.description || 'No description provided'}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Capabilities:</h4>
                  <ul className="list-disc pl-5">
                    {agentConfig.capabilities.map((capability, index) => (
                      <li key={index}>{capability || 'Undefined capability'}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Personality:</h4>
                  <p className="text-gray-600">{agentConfig.personality || 'No personality defined'}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Goals:</h4>
                  <ul className="list-disc pl-5">
                    {agentConfig.goals.map((goal, index) => (
                      <li key={index}>{goal || 'Undefined goal'}</li>
                    ))}
                  </ul>
                </div>

                <Alert>
                  <AlertDescription>
                    This is a preview of your agent configuration. You can test its behavior before saving.
                  </AlertDescription>
                </Alert>
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <RefreshCw className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Click "Preview Agent" to see your agent configuration</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentBuilder;