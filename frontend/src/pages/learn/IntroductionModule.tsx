import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Brain, Lightbulb, BookOpen } from 'lucide-react'
import { useStore } from '../../store/useStore'

export function IntroductionModule() {
  const { markModuleComplete } = useStore()
  const [step, setStep] = useState(0)

  const totalSteps = 6

  const handleComplete = () => {
    markModuleComplete('introduction')
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
          <h1 className="text-3xl font-bold text-white">Introduction</h1>
          <p className="text-gray-400">What are neural networks and why do they exist?</p>
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

      {/* Content */}
      <div className="glass-card mb-8">
        {step === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Let's start with something you already know
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              Imagine teaching a toddler what a dog is.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              You don't hand them a rulebook. You don't explain "four legs, fur, tail, barks." 
              Instead, you just point: <em>"Dog. Dog. That's a dog too."</em>
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Eventually, something magical happens. The child sees a dog they've <strong className="text-white">never seen before</strong> — 
              different size, different color — and they just <em>know</em>. "Dog!"
            </p>
            <div className="bg-void-800 rounded-xl p-6 border-l-4 border-flow-500">
              <p className="text-gray-300">
                Their brain learned the <strong className="text-flow-400">essence</strong> of "dog-ness" 
                from examples, not from rules.
              </p>
            </div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              Computers had a problem
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Computers are incredibly powerful, but they have a limitation: 
              <strong className="text-white"> they only do exactly what we tell them</strong>.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              For decades, programmers tried to teach computers by writing rules:
            </p>
            <div className="bg-void-800 rounded-xl p-6 font-mono text-sm mb-6">
              <div className="text-gray-500">// Trying to recognize a dog with rules...</div>
              <div className="mt-2">
                <span className="text-accent-violet">if</span> has_four_legs <span className="text-accent-violet">and</span> has_fur <span className="text-accent-violet">and</span> barks:
              </div>
              <div className="ml-4 text-flow-400">it's probably a dog</div>
              <div className="mt-4 text-gray-500">// But wait... what about:</div>
              <div className="text-gray-400">// - A photo? (can't hear it bark)</div>
              <div className="text-gray-400">// - A hairless dog?</div>
              <div className="text-gray-400">// - A dog with 3 legs?</div>
              <div className="text-gray-400">// - A fox? (also furry, 4 legs...)</div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              The real world is <strong className="text-accent-rose">messy</strong>. 
              Rules break. Exceptions multiply. Some problems — like recognizing faces, 
              understanding speech, translating languages — are just too complex for hand-written instructions.
            </p>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-violet/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-accent-violet" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Scientists looked to nature
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your brain contains about <strong className="text-white">86 billion neurons</strong> — 
              tiny cells that process information.
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Each neuron is remarkably simple. It just does three things:
            </p>
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-flow-600/30 flex items-center justify-center text-flow-400 font-medium">1</div>
                <div>
                  <div className="font-medium text-white">Receives signals</div>
                  <div className="text-sm text-gray-500">from other neurons connected to it</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-accent-violet/30 flex items-center justify-center text-accent-violet font-medium">2</div>
                <div>
                  <div className="font-medium text-white">Decides if they're important enough</div>
                  <div className="text-sm text-gray-500">to pass along</div>
                </div>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-xl bg-void-800/50">
                <div className="w-8 h-8 rounded-full bg-grad-600/30 flex items-center justify-center text-grad-400 font-medium">3</div>
                <div>
                  <div className="font-medium text-white">Sends its own signal</div>
                  <div className="text-sm text-gray-500">to the next neurons</div>
                </div>
              </div>
            </div>
            <p className="text-gray-300 leading-relaxed">
              <strong className="text-white">Here's the key insight:</strong> You weren't born knowing what a dog is. 
              Your brain <em>learned</em> by adjusting the connections between neurons — 
              making some stronger, some weaker — until patterns emerged.
            </p>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-emerald/20 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-accent-emerald" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                The breakthrough idea
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed text-lg">
              <em>"What if we built a simplified version of this in a computer?"</em>
            </p>
            <p className="text-gray-300 mb-6 leading-relaxed">
              We can't simulate 86 billion neurons. But we <em>can</em> simulate the <strong className="text-flow-400">idea</strong>:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
                <div className="text-sm text-gray-500 mb-1">Instead of biological neurons:</div>
                <div className="text-white font-medium">Simple math operations</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
                <div className="text-sm text-gray-500 mb-1">Instead of chemical signals:</div>
                <div className="text-white font-medium">Numbers flowing through</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
                <div className="text-sm text-gray-500 mb-1">Instead of connection strength:</div>
                <div className="text-white font-medium">Adjustable "weights"</div>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border border-white/5">
                <div className="text-sm text-gray-500 mb-1">Instead of growing up:</div>
                <div className="text-white font-medium">"Training" on examples</div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-flow-600/10 to-accent-violet/10 rounded-xl p-6 border border-flow-500/20">
              <p className="text-gray-300">
                This is an <strong className="text-flow-400">artificial neural network</strong>: 
                a computer system that learns from examples instead of following hand-written rules.
              </p>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-flow-600/20 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-flow-400" />
              </div>
              <h2 className="text-2xl font-semibold text-white">
                Words you'll need to know
              </h2>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Before we dive in, let's learn a few key words. Don't worry about memorizing them — 
              we'll use them throughout and they'll become natural.
            </p>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-flow-500">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-flow-400">Input</span>
                  <span className="text-gray-500 text-sm">(noun)</span>
                </div>
                <p className="text-gray-300">
                  The information you give to the network. Like a photo entering your eyes, 
                  or a sentence entering your ears.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-grad-500">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-grad-400">Output</span>
                  <span className="text-gray-500 text-sm">(noun)</span>
                </div>
                <p className="text-gray-300">
                  The network's answer or response. Like saying "that's a cat" 
                  or "this email is spam."
                </p>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-accent-violet">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-accent-violet">Weight</span>
                  <span className="text-gray-500 text-sm">(noun)</span>
                </div>
                <p className="text-gray-300">
                  How strongly one part of the network listens to another. 
                  Higher weight = "pay more attention to this."
                </p>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-accent-emerald">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-accent-emerald">Training</span>
                  <span className="text-gray-500 text-sm">(verb)</span>
                </div>
                <p className="text-gray-300">
                  The process of showing examples to the network and letting it adjust 
                  its weights to get better. Like practicing a skill.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-void-800/50 border-l-4 border-accent-cyan">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-semibold text-accent-cyan">Prediction</span>
                  <span className="text-gray-500 text-sm">(noun)</span>
                </div>
                <p className="text-gray-300">
                  The network's best guess. Before training, predictions are random. 
                  After training, they're (hopefully) accurate.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h2 className="text-2xl font-semibold text-white mb-4">
              What you're about to learn
            </h2>
            <p className="text-gray-300 mb-6 leading-relaxed">
              In the following modules, we'll build up a neural network piece by piece. 
              Here's the journey:
            </p>
            <div className="space-y-3 mb-8">
              {[
                { num: 1, title: 'Values', desc: 'Everything becomes numbers' },
                { num: 2, title: 'Operations', desc: 'Numbers combine and transform' },
                { num: 3, title: 'Gradients', desc: 'How to know what to improve' },
                { num: 4, title: 'Neuron', desc: 'The building block' },
                { num: 5, title: 'Networks', desc: 'Neurons working together' },
                { num: 6, title: 'Training', desc: 'Putting it all together' },
              ].map((item) => (
                <div key={item.num} className="flex items-center gap-4 p-3 rounded-lg bg-void-800/30">
                  <div className="w-8 h-8 rounded-full bg-flow-600/20 flex items-center justify-center text-flow-400 font-mono text-sm">
                    {item.num}
                  </div>
                  <div>
                    <span className="font-medium text-white">{item.title}</span>
                    <span className="text-gray-500 mx-2">—</span>
                    <span className="text-gray-400">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-flow-600/10 via-accent-violet/10 to-grad-600/10 rounded-xl p-6 border border-white/10">
              <p className="text-gray-300 mb-4">
                <strong className="text-white">The surprising part?</strong> The core ideas fit in about 150 lines of code. 
                The same principles behind ChatGPT, image recognition, and voice assistants 
                are simpler than you might think.
              </p>
              <p className="text-gray-400 text-sm">
                No programming required. Everything is visual and interactive. 
                Just addition and multiplication — no complex math.
              </p>
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
            to="/learn/values"
            onClick={handleComplete}
            className="btn-primary flex items-center gap-2"
          >
            Continue to Values
            <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>
    </div>
  )
}

