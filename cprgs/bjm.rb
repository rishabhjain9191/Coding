def move(pos, direction)
	case direction
	when :down
		pos[1]+=1
	when :left
		pos[0]-=1
	when :up
		pos[1]-=1
	when :right
		pos[0]+=1
	when :diagup
		pos[0],pos[1]=pos[0]+1, pos[1]-1
	when :diagdown
		pos[0],pos[1]=pos[0]-1, pos[1]+1
	end
	return pos
end

def translate(steps)
	guide=[:left, :up, :diagup, :right, :down, :down, :diagdown]
	pos=[0, 0]
	move(pos, :down)
	(steps-1).times{|i|
		puts guide[i%7]
		res=move(pos, guide[i%7])
		puts res.join(' ')
	}
	return pos
end

step=22
puts translate(step)

