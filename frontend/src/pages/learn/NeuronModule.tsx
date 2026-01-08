import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function NeuronModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)
  const [inputs] = useState([1.0, 2.0])
  const [weights, setWeights] = useState([0.5, -0.5])
  const [bias, setBias] = useState(0.5)

  const totalSteps = 4

  const computation = useMemo(() => {
    const weightedSum = inputs.reduce((sum, x, i) => sum + x * weights[i], bias)
    const output = Math.max(0, weightedSum) // ReLU
    return { weightedSum, output }
  }, [inputs, weights, bias])

  const handleComplete = () => {
    markModuleComplete('neuron')
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
          <h1 className="text-3xl font-bold text-white">The Neuron</h1>
          <p className="text-gray-400">The building block of neural networks</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-cyan' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: <span className="text-accent-violet">Weights</span> control how strongly inputs are counted.
          <span className="text-grad-400"> Gradients</span> tell us how to adjust them.
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
              Remembering the biological inspiration
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In the introduction, we learned that your brain has billions of neurons that:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-flow-600/30 text-flow-400 flex items-center justify-center text-sm font-medium">1</span>
                <span className="text-gray-300">Receive signals from other neurons</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-violet/30 text-accent-violet flex items-center justify-center text-sm font-medium">2</span>
                <span className="text-gray-300">Decide if they're important enough to pass along</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-emerald/30 text-accent-emerald flex items-center justify-center text-sm font-medium">3</span>
                <span className="text-gray-300">Send their own signal forward</span>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              An artificial neuron does something similar, but with math:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-flow-600/30 text-flow-400 flex items-center justify-center text-sm font-medium">1</span>
                <span className="text-gray-300"><strong className="text-white">Weighs</strong> each input (multiplies by a <span className="text-accent-violet">weight</span>)</span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-violet/30 text-accent-violet flex items-center justify-center text-sm font-medium">2</span>
                <span className="text-gray-300"><strong className="text-white">Sums</strong> them all together, plus a <span className="text-gray-400">bias</span></span>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-accent-emerald/30 text-accent-emerald flex items-center justify-center text-sm font-medium">3</span>
                <span className="text-gray-300"><strong className="text-white">Activates</strong> — decides whether to "fire" (using ReLU)</span>
              </div>
            </div>

            <div className="bg-void-800 rounded-xl p-6 font-mono text-center">
              <span className="text-accent-emerald">output</span>
              <span className="text-gray-500"> = </span>
              <span className="text-accent-emerald">ReLU</span>
              <span className="text-gray-500">(</span>
              <span className="text-flow-400">input₁</span>
              <span className="text-gray-500"> × </span>
              <span className="text-accent-violet">w₁</span>
              <span className="text-gray-500"> + </span>
              <span className="text-flow-400">input₂</span>
              <span className="text-gray-500"> × </span>
              <span className="text-accent-violet">w₂</span>
              <span className="text-gray-500"> + </span>
              <span className="text-gray-400">bias</span>
              <span className="text-gray-500">)</span>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Build your own neuron
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Adjust the <span className="text-accent-violet">weights</span> and <span className="text-gray-400">bias</span> to see how they affect the output.
              The inputs are fixed at <span className="text-flow-400 font-mono">x₁=1.0</span> and <span className="text-flow-400 font-mono">x₂=2.0</span>.
            </p>

            {/* Neuron visualization */}
            <div className="flex items-center justify-center gap-8 my-8">
              {/* Inputs */}
              <div className="flex flex-col gap-4">
                {inputs.map((x, i) => (
                  <div 
                    key={i}
                    className="w-16 h-16 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center"
                  >
                    <div className="text-xs text-gray-500">x{i + 1}</div>
                    <div className="font-mono text-white">{x}</div>
                  </div>
                ))}
              </div>

              {/* Weights */}
              <div className="flex flex-col gap-2">
                {weights.map((w, i) => (
                  <div key={i} className="text-center">
                    <div className="font-mono text-sm text-accent-violet">×{w.toFixed(1)}</div>
                  </div>
                ))}
              </div>

              {/* Sum node */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-void-800 border-2 border-gray-500 
                             flex items-center justify-center text-xl text-gray-300">
                  Σ
                </div>
                <div className="mt-2 text-sm text-gray-500">+{bias.toFixed(1)}</div>
                <div className="mt-1 font-mono text-sm text-gray-400">
                  = {computation.weightedSum.toFixed(2)}
                </div>
              </div>

              {/* ReLU */}
              <div className="flex flex-col items-center">
                <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center
                  ${computation.weightedSum > 0 
                    ? 'bg-accent-emerald/20 border-accent-emerald' 
                    : 'bg-void-800 border-gray-600'
                  }`}
                >
                  <span className="text-lg">ReLU</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  {computation.weightedSum > 0 ? 'passes' : 'blocked'}
                </div>
              </div>

              {/* Output */}
              <motion.div
                key={computation.output}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-20 h-20 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                         flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500">output</div>
                <div className="text-2xl font-mono text-white">{computation.output.toFixed(2)}</div>
              </motion.div>
            </div>

            {/* Controls */}
            <div className="grid grid-cols-3 gap-6">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Weight 1 (w₁)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[0]}
                  onChange={(e) => setWeights([parseFloat(e.target.value), weights[1]])}
                  className="w-full accent-accent-violet"
                />
                <div className="text-center font-mono text-accent-violet">{weights[0].toFixed(1)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Weight 2 (w₂)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={weights[1]}
                  onChange={(e) => setWeights([weights[0], parseFloat(e.target.value)])}
                  className="w-full accent-accent-violet"
                />
                <div className="text-center font-mono text-accent-violet">{weights[1].toFixed(1)}</div>
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Bias (b)</label>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={bias}
                  onChange={(e) => setBias(parseFloat(e.target.value))}
                  className="w-full accent-gray-400"
                />
                <div className="text-center font-mono text-gray-400">{bias.toFixed(1)}</div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent-cyan/10 border border-accent-cyan/30">
              <p className="text-sm text-gray-300">
                💡 <strong>Try this:</strong> Make both weights positive and the bias negative. 
                Notice how the neuron only "fires" when the weighted sum overcomes the negative bias.
              </p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why ReLU? (The Activation Function)
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The <strong className="text-accent-emerald">ReLU</strong> (Rectified Linear Unit) activation function is beautifully simple:
            </p>
            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-center gap-12">
                <div className="text-center">
                  <div className="font-mono text-2xl text-accent-emerald mb-2">ReLU(x)</div>
                  <div className="text-gray-400">= max(0, x)</div>
                  <div className="text-sm text-gray-500 mt-2">
                    "If positive, pass through.<br/>If negative, output zero."
                  </div>
                </div>
                <svg viewBox="0 0 100 60" className="w-32 h-20">
                  <line x1="10" y1="50" x2="90" y2="50" stroke="#374151" strokeWidth="1" />
                  <line x1="50" y1="10" x2="50" y2="55" stroke="#374151" strokeWidth="1" />
                  <polyline
                    points="10,50 50,50 90,10"
                    fill="none"
                    stroke="#34d399"
                    strokeWidth="2"
                  />
                  <text x="95" y="53" className="fill-gray-500 text-xs">x</text>
                  <text x="52" y="8" className="fill-gray-500 text-xs">y</text>
                </svg>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong className="text-white">Why is this important?</strong> Without activation functions, 
              stacking neurons would just be more multiplication and addition — you'd get a straight line.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              ReLU adds <em>non-linearity</em> — the ability to bend and curve. 
              This lets neural networks learn complex, curvy patterns, not just straight lines.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-gray-500 text-sm mb-2">Without activation:</div>
                <div className="text-white">Only straight lines</div>
                <div className="text-xs text-gray-500 mt-1">No matter how many neurons!</div>
              </div>
              <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
                <div className="text-accent-emerald text-sm mb-2">With ReLU:</div>
                <div className="text-white">Can learn any shape</div>
                <div className="text-xs text-gray-500 mt-1">Curves, edges, complex patterns</div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What gets learned?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Here's the key insight: the <span className="text-accent-violet">weights</span> and <span className="text-gray-400">bias</span> are 
              what the network <strong className="text-white">learns</strong>. Everything else is fixed.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-sm text-gray-500 mb-2">Fixed (you provide):</div>
                <div className="text-flow-400 font-medium">Inputs</div>
                <div className="text-gray-400 text-sm">The data you feed in</div>
              </div>
              <div className="p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
                <div className="text-sm text-gray-500 mb-2">Learned (network adjusts):</div>
                <div className="text-accent-violet font-medium">Weights & Bias</div>
                <div className="text-gray-400 text-sm">Change during training</div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Remember <span className="text-grad-400">gradients</span>? They tell us exactly how to adjust each weight and bias 
              to make the network's output closer to what we want.
            </p>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    A <span className="text-accent-cyan">neuron</span> = weighted sum + bias + activation. 
                    The <span className="text-accent-violet">weights</span> and <span className="text-gray-400">bias</span> are 
                    what gets adjusted during training. Gradients tell us how to adjust them.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-accent-cyan font-medium">Neuron</div>
                  <div className="text-xs text-gray-400">
                    The basic computing unit: inputs × weights + bias → activation
                  </div>
                </div>
                <div>
                  <div className="text-gray-400 font-medium">Bias</div>
                  <div className="text-xs text-gray-400">
                    An extra number added before activation (shifts the threshold)
                  </div>
                </div>
                <div>
                  <div className="text-accent-emerald font-medium">Activation Function</div>
                  <div className="text-xs text-gray-400">
                    Adds non-linearity so networks can learn complex patterns
                  </div>
                </div>
                <div>
                  <div className="text-accent-emerald font-medium">ReLU</div>
                  <div className="text-xs text-gray-400">
                    A simple activation: output = max(0, input)
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
            to="/learn/network"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Networks
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
