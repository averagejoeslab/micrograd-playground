import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function NetworkModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 4

  const handleComplete = () => {
    markModuleComplete('network')
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link 
          to="/learn" 
          className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">Networks</h1>
          <p className="text-gray-400">Neurons working together</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-emerald' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: A <span className="text-accent-cyan">neuron</span> takes inputs, 
          multiplies by <span className="text-accent-violet">weights</span>, adds <span className="text-gray-400">bias</span>, 
          then applies activation
        </span>
      </div>

      {/* Content */}
      <div className="glass-card mb-8">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              One neuron isn't enough
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A single neuron can only learn simple patterns — essentially drawing one line 
              to separate data. To recognize a face, understand language, or play a game, 
              we need <strong className="text-white">many neurons working together</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The solution? Group neurons into <strong className="text-accent-emerald">layers</strong>.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-gray-500">One neuron:</div>
                <div className="text-gray-500">One layer (3 neurons):</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="w-16 h-16 rounded-full bg-accent-violet/20 border-2 border-accent-violet flex items-center justify-center">
                  <span className="text-accent-violet font-mono">n</span>
                </div>
                <div className="text-gray-500">→</div>
                <div className="flex gap-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-12 h-12 rounded-full bg-accent-violet/20 border-2 border-accent-violet flex items-center justify-center">
                      <span className="text-accent-violet font-mono text-sm">n{i}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              Each neuron in a layer gets the <strong className="text-white">same inputs</strong> but 
              has <strong className="text-white">different weights</strong>. 
              This means each neuron learns to detect different things!
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Layers: Groups of neurons
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A <strong className="text-accent-emerald">layer</strong> is simply a group of neurons that:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-gray-300 mb-6">
              <li>All receive the same inputs</li>
              <li>Each have their own weights and bias</li>
              <li>All output their values to the next layer</li>
            </ol>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 200" className="w-full max-w-md">
                {/* Connections */}
                <g stroke="#374151" strokeWidth="1">
                  {[0, 1].map(i => 
                    [0, 1, 2].map(j => (
                      <line 
                        key={`${i}-${j}`}
                        x1="60" 
                        y1={60 + i * 80} 
                        x2="160" 
                        y2={40 + j * 60} 
                      />
                    ))
                  )}
                </g>

                {/* Input layer */}
                <g>
                  <text x="60" y="25" textAnchor="middle" className="fill-gray-500 text-xs">inputs</text>
                  <circle cx="60" cy="60" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="60" y="65" textAnchor="middle" className="fill-white text-sm font-mono">x₁</text>
                  <circle cx="60" cy="140" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="60" y="145" textAnchor="middle" className="fill-white text-sm font-mono">x₂</text>
                </g>

                {/* Layer */}
                <g>
                  <text x="160" y="15" textAnchor="middle" className="fill-accent-emerald text-xs font-medium">Layer</text>
                  {[0, 1, 2].map(i => (
                    <g key={i}>
                      <motion.circle 
                        cx="160" 
                        cy={40 + i * 60} 
                        r="20" 
                        className="fill-accent-violet/30 stroke-accent-violet" 
                        strokeWidth="2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                      />
                      <text x="160" y={45 + i * 60} textAnchor="middle" className="fill-white text-sm font-mono">
                        n{i + 1}
                      </text>
                    </g>
                  ))}
                </g>

                {/* Bracket */}
                <path 
                  d="M 200 30 Q 220 100 200 170" 
                  fill="none" 
                  stroke="#6b7280" 
                  strokeWidth="1" 
                  strokeDasharray="4,4"
                />
                <text x="240" y="105" textAnchor="middle" className="fill-gray-400 text-xs">
                  3 neurons
                </text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-4 text-sm">
              <div className="text-gray-400">
                <strong className="text-white">How many parameters?</strong> If a layer has 3 neurons, 
                each receiving 2 inputs:
              </div>
              <div className="mt-2 text-gray-300">
                3 neurons × (2 weights + 1 bias) = <span className="text-accent-emerald font-mono">9 parameters</span>
              </div>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Stacking layers: The MLP
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              When we stack multiple layers together, we create a{' '}
              <strong className="text-accent-emerald">Multi-Layer Perceptron (MLP)</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The more layers, the more complex patterns the network can learn. 
              Networks with many layers are called <strong className="text-white">"deep"</strong> neural networks — 
              that's where "deep learning" comes from!
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 400 200" className="w-full max-w-lg">
                {/* Connections */}
                <g stroke="#374151" strokeWidth="1" opacity="0.5">
                  {/* Input to hidden1 */}
                  {[0, 1].map(i => 
                    [0, 1, 2, 3].map(j => (
                      <line key={`ih1-${i}-${j}`} x1="50" y1={70 + i * 60} x2="130" y2={35 + j * 45} />
                    ))
                  )}
                  {/* Hidden1 to hidden2 */}
                  {[0, 1, 2, 3].map(i => 
                    [0, 1, 2, 3].map(j => (
                      <line key={`h1h2-${i}-${j}`} x1="130" y1={35 + i * 45} x2="220" y2={35 + j * 45} />
                    ))
                  )}
                  {/* Hidden2 to output */}
                  {[0, 1, 2, 3].map(i => (
                    <line key={`h2o-${i}`} x1="220" y1={35 + i * 45} x2="300" y2="100" />
                  ))}
                </g>

                {/* Input layer */}
                <g>
                  <text x="50" y="20" textAnchor="middle" className="fill-flow-400 text-xs">input</text>
                  {[0, 1].map(i => (
                    <circle key={i} cx="50" cy={70 + i * 60} r="16" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  ))}
                </g>

                {/* Hidden layer 1 */}
                <g>
                  <text x="130" y="15" textAnchor="middle" className="fill-accent-violet text-xs">hidden 1</text>
                  {[0, 1, 2, 3].map(i => (
                    <motion.circle 
                      key={i} 
                      cx="130" 
                      cy={35 + i * 45} 
                      r="14" 
                      className="fill-accent-violet/30 stroke-accent-violet" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 + i * 0.05 }}
                    />
                  ))}
                </g>

                {/* Hidden layer 2 */}
                <g>
                  <text x="220" y="15" textAnchor="middle" className="fill-accent-cyan text-xs">hidden 2</text>
                  {[0, 1, 2, 3].map(i => (
                    <motion.circle 
                      key={i} 
                      cx="220" 
                      cy={35 + i * 45} 
                      r="14" 
                      className="fill-accent-cyan/30 stroke-accent-cyan" 
                      strokeWidth="2"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                    />
                  ))}
                </g>

                {/* Output layer */}
                <g>
                  <text x="300" y="70" textAnchor="middle" className="fill-grad-400 text-xs">output</text>
                  <motion.circle 
                    cx="300" 
                    cy="100" 
                    r="18" 
                    className="fill-grad-600/30 stroke-grad-500" 
                    strokeWidth="2"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.4 }}
                  />
                </g>

                {/* Architecture label */}
                <text x="175" y="195" textAnchor="middle" className="fill-gray-400 text-sm font-mono">
                  MLP(2, [4, 4, 1])
                </text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-4 text-sm">
              <div className="text-gray-400 mb-2">
                <strong className="text-white">MLP(2, [4, 4, 1])</strong> means:
              </div>
              <ul className="space-y-1 text-gray-300">
                <li>• <span className="text-flow-400">2</span> inputs</li>
                <li>• <span className="text-accent-violet">4</span> neurons in first hidden layer</li>
                <li>• <span className="text-accent-cyan">4</span> neurons in second hidden layer</li>
                <li>• <span className="text-grad-400">1</span> output neuron</li>
              </ul>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              The forward pass
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              When you give inputs to a network, data flows forward through each layer — 
              this is called the <strong className="text-flow-400">forward pass</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Each layer transforms the data, building on what the previous layer found:
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 text-sm">1</div>
                <div>
                  <div className="text-white font-medium">Input layer</div>
                  <div className="text-sm text-gray-500">Raw data: pixels, numbers, words</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet text-sm">2</div>
                <div>
                  <div className="text-white font-medium">Early hidden layers</div>
                  <div className="text-sm text-gray-500">Simple features: edges, basic patterns</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-accent-cyan/30 flex items-center justify-center text-accent-cyan text-sm">3</div>
                <div>
                  <div className="text-white font-medium">Later hidden layers</div>
                  <div className="text-sm text-gray-500">Complex features: shapes, concepts</div>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 rounded-lg bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 text-sm">4</div>
                <div>
                  <div className="text-white font-medium">Output layer</div>
                  <div className="text-sm text-gray-500">Final prediction: "cat" or "dog"</div>
                </div>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Neural networks are <span className="text-accent-emerald">layers</span> of neurons stacked together. 
                    Data flows forward (<span className="text-flow-400">forward pass</span>) to make predictions. 
                    <span className="text-grad-400"> Gradients</span> flow backward (<span className="text-grad-400">backward pass</span>) to enable learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-accent-emerald font-medium">Layer</div>
                  <div className="text-xs text-gray-400">
                    A group of neurons that process the same inputs
                  </div>
                </div>
                <div>
                  <div className="text-accent-emerald font-medium">MLP (Multi-Layer Perceptron)</div>
                  <div className="text-xs text-gray-400">
                    Multiple layers stacked together
                  </div>
                </div>
                <div>
                  <div className="text-flow-400 font-medium">Forward Pass</div>
                  <div className="text-xs text-gray-400">
                    Data flowing from inputs to outputs
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 font-medium">Hidden Layer</div>
                  <div className="text-xs text-gray-400">
                    Layers between input and output
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setStep(s => Math.max(0, s - 1))}
          disabled={step === 0}
          className="btn-secondary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ArrowLeft className="w-4 h-4" />
          Previous
        </button>

        {step < totalSteps - 1 ? (
          <button
            onClick={() => setStep(s => s + 1)}
            className="btn-primary flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            to="/learn/training"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Training
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
