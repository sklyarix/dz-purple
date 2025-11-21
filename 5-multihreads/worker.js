import {parentPort, workerData} from 'worker_threads'
import { countMultiplesOf3 } from './countMultiplesOf3.js'

parentPort.postMessage(countMultiplesOf3(workerData))