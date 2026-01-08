import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function OperationsModule() {
  const { markModuleComplete } = useStore()
  const [a, setA] = useState(3)
  const [b, setB] = useState(4)
  const [op, setOp] = useState<'+' | '*'>('+')
  const [step, setStep] = useState(0)

  const totalSteps = 4

  const result = useMemo(() => {
    return op === '+' ? a + b : a * b
  }, [a, b, op])

  const handleComplete = () => {
    markModuleComplete('operations')
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
          <h1 className="text-3xl font-bold text-white">Operations</h1>
          <p className="text-gray-400">Numbers combine and transform</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-violet' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: A <span className="text-flow-400">Value</span> is a container that holds a number
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
              Numbers alone aren't useful
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Having a bunch of Values is like having puzzle pieces scattered on a table. 
              The magic happens when we <strong className="text-white">connect them</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In neural networks, Values combine using simple math operations you already know:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50 text-center">
                <div className="text-3xl mb-2">+</div>
                <div className="text-white font-medium">Addition</div>
                <div className="text-sm text-gray-500">Combine values together</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 text-center">
                <div className="text-3xl mb-2">×</div>
                <div className="text-white font-medium">Multiplication</div>
                <div className="text-sm text-gray-500">Scale values up or down</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              That's it! These two operations — <strong className="text-accent-violet">addition</strong> and{' '}
              <strong className="text-accent-violet">multiplication</strong> — are almost all you need to build a neural network.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Try combining Values
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Adjust the sliders and switch between addition and multiplication. 
              Watch how two inputs combine to create one output.
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {/* Value A */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center mb-2">
                  <div className="text-xs text-gray-500">a</div>
                  <div className="text-3xl font-mono text-white">{a}</div>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  value={a}
                  onChange={(e) => setA(parseInt(e.target.value))}
                  className="w-24 accent-flow-500"
                />
              </div>

              {/* Operation */}
              <div className="flex flex-col items-center gap-2">
                <button
                  onClick={() => setOp('+')}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl
                    ${op === '+' 
                      ? 'bg-accent-violet/20 border-accent-violet text-white' 
                      : 'bg-void-800 border-gray-600 text-gray-400 hover:border-gray-400'
                    }`}
                >
                  +
                </button>
                <button
                  onClick={() => setOp('*')}
                  className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl
                    ${op === '*' 
                      ? 'bg-accent-violet/20 border-accent-violet text-white' 
                      : 'bg-void-800 border-gray-600 text-gray-400 hover:border-gray-400'
                    }`}
                >
                  ×
                </button>
              </div>

              {/* Value B */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center mb-2">
                  <div className="text-xs text-gray-500">b</div>
                  <div className="text-3xl font-mono text-white">{b}</div>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="10"
                  value={b}
                  onChange={(e) => setB(parseInt(e.target.value))}
                  className="w-24 accent-flow-500"
                />
              </div>

              <div className="text-3xl text-gray-500">=</div>

              {/* Result */}
              <motion.div
                key={result}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-24 h-24 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                         flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500">result</div>
                <div className="text-3xl font-mono text-white">{result}</div>
              </motion.div>
            </div>

            <div className="p-4 rounded-xl bg-accent-violet/10 border border-accent-violet/30">
              <p className="text-sm text-gray-300">
                💡 <strong>Notice:</strong> Two <span className="text-flow-400">inputs</span> go in, 
                one <span className="text-grad-400">output</span> comes out. This is how information 
                transforms as it flows through a neural network — values combine into new values.
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
              Chaining operations together
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              The output of one operation can become the input to another. 
              When we chain many operations together, we create what's called a{' '}
              <strong className="text-accent-violet">computation graph</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Think of it like a recipe: each step uses the result from the previous step.
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 400 150" className="w-full max-w-lg">
                {/* Edges */}
                <line x1="60" y1="50" x2="140" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="60" y1="100" x2="140" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="180" y1="75" x2="220" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="260" y1="75" x2="340" y2="75" stroke="#3b82f6" strokeWidth="2" />
                <line x1="60" y1="125" x2="300" y2="95" stroke="#3b82f6" strokeWidth="2" />

                {/* Input nodes */}
                <g>
                  <circle cx="40" cy="50" r="25" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="45" textAnchor="middle" className="fill-gray-400 text-xs">x</text>
                  <text x="40" y="58" textAnchor="middle" className="fill-white text-sm font-mono">2</text>
                </g>
                <g>
                  <circle cx="40" cy="100" r="25" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="95" textAnchor="middle" className="fill-gray-400 text-xs">y</text>
                  <text x="40" y="108" textAnchor="middle" className="fill-white text-sm font-mono">3</text>
                </g>
                <g>
                  <circle cx="40" cy="125" r="20" className="fill-flow-600/30 stroke-flow-500" strokeWidth="2" />
                  <text x="40" y="130" textAnchor="middle" className="fill-white text-sm font-mono">1</text>
                </g>

                {/* Operations */}
                <g>
                  <circle cx="160" cy="75" r="18" className="fill-void-800 stroke-gray-500" strokeWidth="2" />
                  <text x="160" y="80" textAnchor="middle" className="fill-gray-300 text-lg">×</text>
                </g>
                <g>
                  <circle cx="300" cy="75" r="18" className="fill-void-800 stroke-gray-500" strokeWidth="2" />
                  <text x="300" y="80" textAnchor="middle" className="fill-gray-300 text-lg">+</text>
                </g>

                {/* Intermediate */}
                <g>
                  <circle cx="240" cy="75" r="22" className="fill-accent-violet/30 stroke-accent-violet" strokeWidth="2" />
                  <text x="240" y="80" textAnchor="middle" className="fill-white text-sm font-mono">6</text>
                </g>

                {/* Output */}
                <g>
                  <circle cx="360" cy="75" r="25" className="fill-grad-600/30 stroke-grad-500" strokeWidth="2" />
                  <text x="360" y="70" textAnchor="middle" className="fill-gray-400 text-xs">out</text>
                  <text x="360" y="83" textAnchor="middle" className="fill-white text-sm font-mono">7</text>
                </g>

                {/* Labels */}
                <text x="160" y="110" textAnchor="middle" className="fill-gray-500 text-xs">2 × 3 = 6</text>
                <text x="300" y="110" textAnchor="middle" className="fill-gray-500 text-xs">6 + 1 = 7</text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-4 text-sm">
              <div className="text-gray-400 mb-2">Reading the graph:</div>
              <ol className="list-decimal list-inside space-y-1 text-gray-300">
                <li><span className="text-flow-400">x (2)</span> and <span className="text-flow-400">y (3)</span> multiply to get <span className="text-accent-violet">6</span></li>
                <li><span className="text-accent-violet">6</span> and <span className="text-flow-400">1</span> add to get <span className="text-grad-400">7</span></li>
              </ol>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why this matters
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A neural network is just a big computation graph — values flowing through 
              operations to produce outputs.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              But here's the crucial part: the network <strong className="text-white">remembers the path</strong>. 
              It keeps track of which values contributed to the final result, and how.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              This "memory" is what allows the network to learn. When the output is wrong, 
              we can trace back through the graph and figure out which values need to change.
            </p>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    Operations combine Values into new Values. When we chain operations together, 
                    we build a <span className="text-accent-violet">computation graph</span>. 
                    The network remembers this graph — and that's the key to learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
              <div className="text-accent-violet font-medium">Computation Graph</div>
              <div className="text-sm text-gray-400">
                The connected chain of values and operations that transforms inputs into outputs
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
            to="/learn/gradients"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Gradients
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
