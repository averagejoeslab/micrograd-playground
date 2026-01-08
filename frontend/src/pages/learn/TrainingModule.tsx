import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Check, Sparkles, HelpCircle } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function TrainingModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 5

  const handleComplete = () => {
    markModuleComplete('training')
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
          <h1 className="text-3xl font-bold text-white">Training</h1>
          <p className="text-gray-400">Learning from mistakes</p>
        </div>
      </div>

      {/* Progress */}
      <div className="flex gap-2 mb-8">
        {[...Array(totalSteps)].map((_, i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-colors ${
              i <= step ? 'bg-accent-rose' : 'bg-void-700'
            }`}
          />
        ))}
      </div>

      {/* Vocabulary reminder */}
      <div className="mb-6 p-3 rounded-lg bg-void-800/30 border border-white/5 flex items-center gap-3">
        <HelpCircle className="w-4 h-4 text-gray-500" />
        <span className="text-sm text-gray-500">
          Remember: <span className="text-grad-400">Gradients</span> tell us how changing each weight affects the output.
          <span className="text-accent-violet"> Weights</span> are what the network adjusts to learn.
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
              How do we know when we're wrong?
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Remember the goal: we want the network to give correct answers. 
              But how do we measure <em>how wrong</em> we are?
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We use a <strong className="text-accent-rose">loss function</strong> — a number that tells us 
              how far off our predictions are from the truth.
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center mb-6">
                <div className="text-sm text-gray-500 mb-2">Simple example: Mean Squared Error</div>
                <div className="font-mono text-xl">
                  <span className="text-accent-rose">loss</span>
                  <span className="text-gray-500"> = </span>
                  <span className="text-gray-400">(</span>
                  <span className="text-grad-400">prediction</span>
                  <span className="text-gray-500"> - </span>
                  <span className="text-accent-emerald">target</span>
                  <span className="text-gray-400">)</span>
                  <span className="text-gray-500">²</span>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-grad-600/20 border-2 border-grad-500/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">0.8</span>
                  </div>
                  <div className="text-xs text-gray-500">prediction</div>
                </div>
                <div className="text-2xl text-gray-500">-</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-accent-emerald/20 border-2 border-accent-emerald/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">1.0</span>
                  </div>
                  <div className="text-xs text-gray-500">target</div>
                </div>
                <div className="text-2xl text-gray-500">=</div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl bg-accent-rose/20 border-2 border-accent-rose/50 
                               flex items-center justify-center mb-2">
                    <span className="font-mono text-white">0.04</span>
                  </div>
                  <div className="text-xs text-gray-500">loss</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-accent-emerald/10 border border-accent-emerald/30">
                <div className="font-medium text-white mb-1">Perfect prediction</div>
                <div className="text-sm text-gray-400">
                  prediction = target → loss = <span className="text-accent-emerald">0</span>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-accent-rose/10 border border-accent-rose/30">
                <div className="font-medium text-white mb-1">Bad prediction</div>
                <div className="text-sm text-gray-400">
                  prediction ≠ target → loss = <span className="text-accent-rose">big number</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              The goal: minimize the loss
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Training is simply this: <strong className="text-white">find the weights that make the loss as small as possible</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              But how do we know which way to adjust the weights? This is where <span className="text-grad-400">gradients</span> come in!
            </p>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <div className="text-gray-400">Remember from the Gradients module:</div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-3 rounded-lg bg-void-900/50">
                  <div className="text-grad-400 font-medium mb-1">Gradient = Sensitivity</div>
                  <div className="text-sm text-gray-400">
                    How much the loss changes when we change a weight
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-void-900/50">
                  <div className="text-grad-400 font-medium mb-1">Backpropagation</div>
                  <div className="text-sm text-gray-400">
                    Calculates gradients for every weight automatically
                  </div>
                </div>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              The gradient tells us: <em>"If this weight goes up, does the loss go up or down?"</em>
              <br />
              If the gradient is <span className="text-accent-rose">positive</span>, increasing the weight increases the loss (bad!).
              <br />
              If the gradient is <span className="text-accent-emerald">negative</span>, increasing the weight decreases the loss (good!).
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Gradient descent: Rolling downhill
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              <strong className="text-grad-400">Gradient descent</strong> is how we use gradients to improve the network.
              Think of it like a ball rolling downhill:
            </p>

            <div className="flex items-center justify-center my-8">
              <svg viewBox="0 0 300 150" className="w-full max-w-md">
                {/* Loss landscape */}
                <path
                  d="M 20 100 Q 80 120 150 50 Q 220 20 280 80"
                  fill="none"
                  stroke="#374151"
                  strokeWidth="3"
                />
                
                {/* Ball positions */}
                <motion.g
                  initial={{ x: 0 }}
                  animate={{ x: [0, 40, 80, 110] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  <circle cx="40" cy="110" r="8" className="fill-accent-rose" />
                </motion.g>
                
                {/* Labels */}
                <text x="150" y="140" textAnchor="middle" className="fill-gray-500 text-xs">weights</text>
                <text x="15" y="60" className="fill-gray-500 text-xs">loss</text>
                
                {/* Minimum marker */}
                <line x1="200" y1="30" x2="200" y2="45" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />
                <text x="200" y="55" textAnchor="middle" className="fill-accent-emerald text-xs">minimum</text>

                {/* Gradient arrow */}
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                  </marker>
                </defs>
                <line x1="60" y1="95" x2="100" y2="75" stroke="#f97316" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="80" y="70" className="fill-grad-400 text-xs">gradient</text>
              </svg>
            </div>

            <div className="bg-void-800 rounded-xl p-6 mb-6">
              <div className="text-center font-mono">
                <span className="text-accent-violet">weight</span>
                <span className="text-gray-500"> = </span>
                <span className="text-accent-violet">weight</span>
                <span className="text-gray-500"> - </span>
                <span className="text-flow-400">learning_rate</span>
                <span className="text-gray-500"> × </span>
                <span className="text-grad-400">gradient</span>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed">
              The <span className="text-flow-400">learning rate</span> controls how big each step is.
              <br />
              Too big → you might overshoot and miss the minimum
              <br />
              Too small → training takes forever
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              The training loop
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Training happens in a loop. We repeat the same steps over and over, 
              and each time the network gets a little better.
            </p>

            <div className="space-y-4 mb-6">
              {[
                { step: 1, title: 'Forward pass', desc: 'Feed data through network, get predictions', color: 'flow' },
                { step: 2, title: 'Compute loss', desc: 'Measure how wrong the predictions are', color: 'rose' },
                { step: 3, title: 'Backward pass', desc: 'Calculate gradients for all weights', color: 'grad' },
                { step: 4, title: 'Update weights', desc: 'Nudge weights in the direction that reduces loss', color: 'emerald' },
                { step: 5, title: 'Repeat', desc: 'Go back to step 1 with new data', color: 'violet' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4"
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                    ${item.color === 'flow' ? 'bg-flow-600/30 text-flow-400' :
                      item.color === 'rose' ? 'bg-accent-rose/30 text-accent-rose' :
                      item.color === 'grad' ? 'bg-grad-600/30 text-grad-400' :
                      item.color === 'emerald' ? 'bg-accent-emerald/30 text-accent-emerald' :
                      'bg-accent-violet/30 text-accent-violet'
                    }`}
                  >
                    {item.step}
                  </div>
                  <div>
                    <div className="font-medium text-white">{item.title}</div>
                    <div className="text-sm text-gray-500">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-gray-300 leading-relaxed">
              One complete pass through your training data is called an <strong className="text-white">epoch</strong>.
              Networks typically train for hundreds or thousands of epochs.
            </p>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              🎉 You made it!
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Congratulations! You now understand the fundamental concepts behind neural networks:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {[
                { title: 'Values', desc: 'Numbers with gradients' },
                { title: 'Operations', desc: 'Building computation graphs' },
                { title: 'Gradients', desc: 'Measuring sensitivity' },
                { title: 'Neurons', desc: 'Weighted sums + activations' },
                { title: 'Networks', desc: 'Layers of neurons' },
                { title: 'Training', desc: 'Learning from data' },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 rounded-xl bg-void-800/50 border border-white/5"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Check className="w-4 h-4 text-accent-emerald" />
                    <span className="font-medium text-white">{item.title}</span>
                  </div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </motion.div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-flow-600/20 via-accent-violet/20 to-grad-600/20 
                          border border-white/10 rounded-xl p-6 text-center">
              <Sparkles className="w-12 h-12 text-flow-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Ready to experiment?</h3>
              <p className="text-gray-400 mb-4">
                Head to the Playground to build your own networks and watch them learn!
              </p>
              <Link
                to="/playground"
                className="btn-primary inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Open Playground
              </Link>
            </div>

            <div className="mt-6 bg-accent-emerald/10 border border-accent-emerald/30 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent-emerald mt-0.5" />
                <div>
                  <div className="font-medium text-white">What you've learned</div>
                  <p className="text-sm text-gray-400 mt-1">
                    The same principles that power ChatGPT, image generators, and self-driving cars.
                    Those networks are bigger, but the core ideas are exactly what you learned here.
                    <strong className="text-white"> You now have the intuition!</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-void-800/50 border border-white/5">
              <div className="text-sm text-gray-500 mb-2">Final vocabulary recap:</div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="text-accent-rose font-medium">Loss</div>
                  <div className="text-xs text-gray-400">
                    A number measuring how wrong the predictions are
                  </div>
                </div>
                <div>
                  <div className="text-grad-400 font-medium">Gradient Descent</div>
                  <div className="text-xs text-gray-400">
                    Using gradients to adjust weights toward lower loss
                  </div>
                </div>
                <div>
                  <div className="text-flow-400 font-medium">Learning Rate</div>
                  <div className="text-xs text-gray-400">
                    How big of a step to take when adjusting weights
                  </div>
                </div>
                <div>
                  <div className="text-white font-medium">Epoch</div>
                  <div className="text-xs text-gray-400">
                    One complete pass through the training data
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
            to="/learn"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Complete Journey
            <Check className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}
