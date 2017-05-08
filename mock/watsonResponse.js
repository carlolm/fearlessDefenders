/* eslint-disable */

module.exports.tone = {
  "utterances_tone": [
    {
      "utterance_id": 0,
      "utterance_text": "Basically think of $AAPL as a ~$32B SaaS business linked to a ~$200B hardware business with gross margins of ~38 percent ",
      "tones": []
    },
    {
      "utterance_id": 1,
      "utterance_text": "When @tim_cook was here one year ago today, $AAPL was at $93. \"Hold it, don't trade it.\" -@JimCramer",
      "tones": [
        {
          "score": 0.572474,
          "tone_id": "sad",
          "tone_name": "sad"
        },
        {
          "score": 0.844589,
          "tone_id": "frustrated",
          "tone_name": "frustrated"
        }
      ]
    },
    {
      "utterance_id": 2,
      "utterance_text": "Hilarious that @jimcramer mentioned the @amazonfirephone in his interview with @tim_cook. #CNBC #MadMoney $AAPL",
      "tones": [
        {
          "score": 0.915865,
          "tone_id": "excited",
          "tone_name": "excited"
        }
      ]
    }
  ]
}


module.exports.sentiment = {
  "sentiment": {
    "document": {
      "score": -0.854822,
      "label": "negative"
    }
  },
  "language": "en"
}
