import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, HelpCircle, Play } from 'lucide-react'
import { useStore } from '../../store/useStore'
import { Value } from '../../core/engine'

export function GradientsModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [showWiggle, setShowWiggle] = useState(false)
  const [showGradients, setShowGradients] = useState(false)

  const totalSteps = 6

  const computation = useMemo(() => {
    const valA = new Value(a)
    const valB = new Value(b)
    const c = valA.mul(valB)
    c.backward()
    return {
      result: c.data,
      gradA: valA.grad,
      gradB: valB.grad,
    }
  }, [a, b])

  // For the wiggle demonstration
  const wiggleDemo = useMemo(() => {
    const original = a * b
    const wiggled = (a + 0.1) * b
    const change = wiggled - original
    return { original, wiggled, change: change.toFixed(2) }
  }, [a, b])

  const handleComplete = () => {
    markModuleComplete('gradients')
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
          <h1 className="text-3xl font-bold text-white">Gradients</h1>
          <p className="text-gray-400">How to know what to improve</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-grad-500' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: A <span className="text-accent-violet">computation graph</span> traces how values combine into outputs
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
              The problem we need to solve
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Imagine you have a neural network that's giving wrong answers. 
              It says "cat" when it should say "dog."
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You want to fix it. But the network has thousands of Values (numbers) inside. 
              <strong className="text-white"> Which ones should you change? And by how much?</strong>
            </p>
            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🤔</div>
                <p className="text-gray-300">
                  "I have 1,000 knobs I could turn...<br/>
                  <span className="text-accent-rose">Which ones actually matter for the output?</span>"
                </p>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              This is the key question that gradients answer. Let's build up to it step by step.
            </p>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What if we wiggle a number?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Let's start with a simple question. We have: <strong className="text-flow-400">a × b = result</strong>
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              What happens to the result if we change <span className="text-flow-400">a</span> just a tiny bit?
            </p>

            <div className="flex items-center justify-center gap-6 my-8">
              {/* Value A */}
              <div className="flex flex-col items-center">
                <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
                  ${showWiggle ? 'bg-flow-600/30 border-flow-500' : 'bg-flow-600/20 border-flow-500/50'}`}
                >
                  <div className="text-xs text-gray-500">a</div>
                  <div className="text-2xl font-mono text-white">
                    {showWiggle ? (a + 0.1).toFixed(1) : a}
                  </div>
                  {showWiggle && (
                    <div className="text-xs text-flow-400">+0.1</div>
                  )}
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={a}
                  onChange={(e) => { setA(parseInt(e.target.value)); setShowWiggle(false); }}
                  className="w-24 mt-2 accent-flow-500"
                />
              </div>

              <div className="text-2xl text-gray-500">×</div>

              {/* Value B */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 rounded-xl bg-flow-600/20 border-2 border-flow-500/50 
                             flex flex-col items-center justify-center">
                  <div className="text-xs text-gray-500">b</div>
                  <div className="text-2xl font-mono text-white">{b}</div>
                </div>
                <input
                  type="range"
                  min="1"
                  max="5"
                  value={b}
                  onChange={(e) => { setB(parseInt(e.target.value)); setShowWiggle(false); }}
                  className="w-24 mt-2 accent-flow-500"
                />
              </div>

              <div className="text-2xl text-gray-500">=</div>

              {/* Result */}
              <div className={`w-24 h-24 rounded-xl border-2 flex flex-col items-center justify-center
                ${showWiggle ? 'bg-grad-600/30 border-grad-500' : 'bg-grad-600/20 border-grad-500/50'}`}
              >
                <div className="text-xs text-gray-500">result</div>
                <div className="text-2xl font-mono text-white">
                  {showWiggle ? wiggleDemo.wiggled.toFixed(1) : wiggleDemo.original}
                </div>
                {showWiggle && (
                  <div className="text-xs text-grad-400">+{wiggleDemo.change}</div>
                )}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowWiggle(!showWiggle)}
                className="btn-primary flex items-center gap-2"
              >
                {showWiggle ? 'Reset' : `Wiggle 'a' by +0.1`}
              </button>
            </div>

            {showWiggle && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-grad-600/10 border border-grad-500/30 rounded-xl p-4"
              >
                <p className="text-gray-300">
                  <strong className="text-white">Look!</strong> When we changed <span className="text-flow-400">a</span> by 0.1, 
                  the result changed by <span className="text-grad-400">{wiggleDemo.change}</span>.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  The result changed by about <strong className="text-white">{b}×</strong> what we changed <span className="text-flow-400">a</span> by. 
                  That's not a coincidence!
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Some values matter more than others
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Here's the insight: when we wiggle <span className="text-flow-400">a</span>, 
              the result changes by an amount related to <span className="text-flow-400">b</span>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              And when we wiggle <span className="text-flow-400">b</span>, 
              the result changes by an amount related to <span className="text-flow-400">a</span>.
            </p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-flow-500">
                <div className="font-medium text-white mb-2">Wiggle a by 0.1:</div>
                <div className="text-gray-300">
                  Result changes by <span className="text-grad-400">~{(b * 0.1).toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  (0.1 × b = 0.1 × {b})
                </div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-flow-500">
                <div className="font-medium text-white mb-2">Wiggle b by 0.1:</div>
                <div className="text-gray-300">
                  Result changes by <span className="text-grad-400">~{(a * 0.1).toFixed(2)}</span>
                </div>
                <div className="text-sm text-gray-500 mt-1">
                  (0.1 × a = 0.1 × {a})
                </div>
              </div>
            </div>

            <div className="bg-void-800 rounded-xl p-6">
              <p className="text-gray-300 mb-4">
                <strong className="text-white">The pattern:</strong> The "sensitivity" of the result to each input 
                depends on the <em>other</em> values in the equation.
              </p>
              <p className="text-gray-400 text-sm">
                In <span className="text-flow-400">a × b</span>: 
                changing <span className="text-flow-400">a</span> matters more when <span className="text-flow-400">b</span> is large,
                and changing <span className="text-flow-400">b</span> matters more when <span className="text-flow-400">a</span> is large.
              </p>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Now we can name it: The Gradient
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              This "sensitivity" — <em>how much the output changes when we change an input</em> — 
              has a name: the <strong className="text-grad-400">gradient</strong>.
            </p>

            <div className="bg-grad-600/10 border border-grad-500/30 rounded-xl p-6 mb-6">
              <div className="text-center">
                <div className="text-lg text-gray-300 mb-2">
                  The <span className="text-grad-400 font-semibold">gradient</span> of a value tells you:
                </div>
                <div className="text-xl text-white font-medium">
                  "If I nudge this number a tiny bit,<br/>
                  how much does the final result change?"
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-flow-400 font-mono">a = {a}</div>
                </div>
                <div className="text-gray-300">
                  Gradient: <span className="text-grad-400 font-mono">{b}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Changing a by 1 changes result by ~{b}
                </div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-flow-400 font-mono">b = {b}</div>
                </div>
                <div className="text-gray-300">
                  Gradient: <span className="text-grad-400 font-mono">{a}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Changing b by 1 changes result by ~{a}
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">This is why Values store two things:</strong> the number itself, 
              and its gradient. The gradient is the key to learning!
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Backpropagation: Computing gradients automatically
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In a real neural network, we don't calculate gradients by hand. 
              We use a technique called <strong className="text-flow-400">backpropagation</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Remember how the computation graph traces the path from inputs to output? 
              Backpropagation <strong className="text-white">walks backward</strong> along that path, 
              computing gradients as it goes.
            </p>

            <div className="flex items-center justify-center gap-4 my-8">
              {/* Value A */}
              <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                ${showGradients ? 'bg-flow-600/20 border-flow-500/50' : 'bg-flow-600/10 border-flow-500/30'}`}
              >
                <div className="text-xs text-gray-500">a</div>
                <div className="text-2xl font-mono text-white">{a}</div>
                {showGradients && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                  >
                    <div className="text-xs text-gray-500">grad</div>
                    <div className="text-sm font-mono text-grad-400">{computation.gradA}</div>
                  </motion.div>
                )}
              </div>

              <div className="text-xl text-gray-500">×</div>

              <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                ${showGradients ? 'bg-flow-600/20 border-flow-500/50' : 'bg-flow-600/10 border-flow-500/30'}`}
              >
                <div className="text-xs text-gray-500">b</div>
                <div className="text-2xl font-mono text-white">{b}</div>
                {showGradients && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                  >
                    <div className="text-xs text-gray-500">grad</div>
                    <div className="text-sm font-mono text-grad-400">{computation.gradB}</div>
                  </motion.div>
                )}
              </div>

              <div className="text-xl text-gray-500">=</div>

              <div className={`w-28 h-28 rounded-xl border-2 flex flex-col items-center justify-center
                ${showGradients ? 'bg-grad-600/20 border-grad-500/50 glow-orange' : 'bg-grad-600/10 border-grad-500/30'}`}
              >
                <div className="text-xs text-gray-500">result</div>
                <div className="text-2xl font-mono text-white">{computation.result}</div>
                {showGradients && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 pt-2 border-t border-white/10 w-full text-center"
                  >
                    <div className="text-xs text-gray-500">grad</div>
                    <div className="text-sm font-mono text-grad-400">1</div>
                  </motion.div>
                )}
              </div>
            </div>

            <div className="flex justify-center mb-6">
              <button
                onClick={() => setShowGradients(true)}
                disabled={showGradients}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Play className="w-4 h-4" />
                Run Backpropagation
              </button>
            </div>

            {showGradients && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-void-800 rounded-xl p-4 text-sm"
              >
                <p className="text-gray-300 mb-2">
                  <strong className="text-grad-400">Backpropagation computed:</strong>
                </p>
                <ul className="space-y-1 text-gray-400">
                  <li>• The result's gradient is <span className="text-grad-400">1</span> (it's what we're measuring)</li>
                  <li>• <span className="text-flow-400">a</span>'s gradient is <span className="text-grad-400">{computation.gradA}</span> (equals b)</li>
                  <li>• <span className="text-flow-400">b</span>'s gradient is <span className="text-grad-400">{computation.gradB}</span> (equals a)</li>
                </ul>
              </motion.div>
            )}
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Why this is the key to learning
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Remember the problem we started with? A neural network giving wrong answers, 
              and we need to know which values to change?
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong className="text-white">Gradients are the answer.</strong> They tell us:
            </p>

            <div className="space-y-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
                <div className="font-medium text-white mb-1">Which values matter</div>
                <div className="text-sm text-gray-400">
                  Large gradient = this value has a big effect on the output
                </div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
                <div className="font-medium text-white mb-1">Which direction to change</div>
                <div className="text-sm text-gray-400">
                  Positive gradient = increasing this value increases the output
                </div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
                <div className="font-medium text-white mb-1">How much to change</div>
                <div className="text-sm text-gray-400">
                  The gradient magnitude tells us how sensitive the output is
                </div>
              </div>
            </div>

            <div className="bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">Key Takeaway</div>
                  <p className="text-sm text-gray-400 mt-1">
                    The <span className="text-grad-400">gradient</span> tells us how sensitive the output is to each input.
                    <span className="text-flow-400"> Backpropagation</span> computes all gradients automatically by walking 
                    backward through the computation graph. This is how neural networks know what to adjust when learning.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">New vocabulary:</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-grad-400 font-medium">Gradient</div>
                  <div className="text-xs text-gray-400">
                    How much the output changes when you change a value
                  </div>
                </div>
                <div>
                  <div className="text-flow-400 font-medium">Backpropagation</div>
                  <div className="text-xs text-gray-400">
                    Walking backward through the graph to compute all gradients
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
            to="/learn/neuron"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Neurons
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
