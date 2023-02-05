import ArrayQueue from "../../Queue/ArrayQueue";

function hotProto(names: string[], num: number): number {
    if(names.length === 0) return -1
    const queue = new ArrayQueue<string>()
    for (let i = 0; i < names.length; i++) {
        queue.enqueue(names[i])
    }
    while(queue.size() > 1) {
        for (let i = 1; i < num; i++) {
            const name = queue.dequeue()
            if(name) {
                queue.enqueue(name)
            }
        }
        queue.dequeue()
    }

    const lastname = queue.dequeue()
    return names.findIndex(name => name === lastname)
}

const names = ['abc', 'cba', 'nba', 'aaa']
console.log(names[hotProto(names, 3)]) 