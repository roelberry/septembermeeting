import plotly.graph_objects as go
import plotly.io as pio

# Traffic sources data
sources = ['Direct', 'Google Organic', 'Facebook', 'Wix Email', 'Bing']
values = [129, 127, 40, 29, 7]

# Create pie chart
fig = go.Figure(data=[go.Pie(
    labels=sources,
    values=values,
    hole=0.3,
    textinfo='label+percent',
    textposition='inside'
)])

# Update layout with title and styling
fig.update_layout(
    title="Traffic Sources Breakdown",
    uniformtext_minsize=14, 
    uniformtext_mode='hide'
)

# Save the chart
fig.write_image("traffic_sources_chart.png")