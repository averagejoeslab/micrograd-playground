import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

// Always show hints for maximum helpfulness

export function ValuesModule() {
  const { markModuleComplete } = useStore()
  const [value, setValue] = useState(5)
  const [step, setStep] = useState(0)

  const totalSteps = 4

  const handleComplete = () => {
    markModuleComplete('values')
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
          <h1 className="text-3xl font-bold text-white">Values</h1>
          <p className="text-gray-400">Everything becomes numbers</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-flow-500' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: <span className="text-flow-400">Input</span> = information going in, 
          <span className="text-grad-400"> Output</span> = the network's answer
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
              Computers only understand numbers
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Here's something that might surprise you: to a computer, <em>everything</em> is a number.
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-sm text-gray-500 mb-1">A photo</div>
                <div className="text-white">→ Millions of numbers (pixel colors)</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-sm text-gray-500 mb-1">A word</div>
                <div className="text-white">→ A list of numbers (letter codes)</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-sm text-gray-500 mb-1">A sound</div>
                <div className="text-white">→ Thousands of numbers (wave heights)</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="text-sm text-gray-500 mb-1">Your age</div>
                <div className="text-white">→ Already a number!</div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Neural networks work with these numbers. The <span className="text-flow-400 font-medium">inputs</span> are numbers, 
              the <span className="text-grad-400 font-medium">outputs</span> are numbers, and everything in between is numbers.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Introducing the "Value"
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In our neural network, we store numbers in containers called <strong className="text-flow-400">Values</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              A Value is simply a box that holds a number. That's it! Nothing fancy yet.
            </p>
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-flow-600/20 to-flow-500/10 
                           border-2 border-flow-500/50 flex flex-col items-center justify-center">
                <div className="text-xs text-gray-500 mb-1">Value</div>
                <div className="text-4xl font-mono text-white">5</div>
              </div>
            </div>
            <div className="bg-void-800 rounded-xl p-4 text-sm text-gray-400">
              <p>
                <strong className="text-white">Why "Value" and not just "number"?</strong> Because later, 
                we'll add something special to it. But for now, think of it as a labeled box holding a number.
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
              Try it yourself
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Use the slider below to change the number inside the Value. 
              Values can be positive, negative, or zero — just like regular numbers.
            </p>

            <div className="flex items-center gap-8 mb-8">
              {/* Slider */}
              <div className="flex-1">
                <input
                  type="range"
                  min="-10"
                  max="10"
                  step="0.5"
                  value={value}
                  onChange={(e) => setValue(parseFloat(e.target.value))}
                  className="w-full accent-flow-500"
                />
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>-10</span>
                  <span>0</span>
                  <span>10</span>
                </div>
              </div>

              {/* Value display */}
              <motion.div
                key={value}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="w-32 h-32 rounded-2xl bg-gradient-to-br from-flow-600/20 to-flow-500/10 
                         border-2 border-flow-500/50 flex flex-col items-center justify-center"
              >
                <div className="text-xs text-gray-500 mb-1">Value</div>
                <div className="text-3xl font-mono text-white">{value}</div>
              </motion.div>
            </div>

            {/* Helpful hint */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-flow-600/10 border border-flow-500/30"
            >
              <p className="text-sm text-flow-300">
                💡 <strong>Notice:</strong> When you move the slider, the Value updates instantly. 
                In a neural network, thousands of these Values change as information flows through.
              </p>
            </motion.div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Values have a secret superpower
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Here's what makes Values special in a neural network. 
              Each Value stores <strong className="text-white">two things</strong>:
            </p>

            <div className="flex items-center gap-8 mb-8">
              <motion.div
                className="flex-1 h-40 rounded-2xl bg-gradient-to-br from-flow-600/20 to-flow-500/10 
                         border-2 border-flow-500/50 flex flex-col items-center justify-center p-4"
              >
                <div className="text-xs text-gray-500 mb-2">Value</div>
                <div className="text-3xl font-mono text-white mb-4">{value}</div>
                <div className="w-full border-t border-white/10 pt-3 text-center">
                  <div className="text-xs text-gray-500">gradient</div>
                  <div className="text-lg font-mono text-grad-400">???</div>
                </div>
              </motion.div>

              <div className="flex-1 space-y-4">
                <div className="p-3 rounded-lg bg-void-800/50">
                  <div className="text-flow-400 font-medium mb-1">The number itself</div>
                  <div className="text-sm text-gray-400">
                    The actual data ({value} in this case)
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-void-800/50">
                  <div className="text-grad-400 font-medium mb-1">The gradient</div>
                  <div className="text-sm text-gray-400">
                    A special number we'll learn about soon — it's the key to learning!
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    A <span className="text-flow-400">Value</span> holds a number. Every piece of information 
                    in a neural network — inputs, outputs, everything in between — is stored as Values. 
                    The <span className="text-grad-400">gradient</span> part will make sense soon!
                  </p>
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
            to="/learn/operations"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Operations
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
